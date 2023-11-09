<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!--chart需要有容器-->
  <div class="chart-main">
    <div
      class="chart-container"
      id="main"
    ></div>
  </div>
</template>

<script setup>
// 导入了一些 Vue.js 和其他库的函数和模块，以及一些自定义的函数
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import * as d3 from 'd3'
import { getChartData } from '../utils/getChartData.js'
import { useRoute } from 'vue-router'

// 获取当前路由信息
const route = useRoute()
// Chart 所在的dom对象
const chartDom = ref(null)
// Chart 自身的对象
const myChart = ref(null)

// mounted vue生命周期-挂载
onMounted(() => {
  // 获取id为"main"的元素，并将其赋值给chartDom.value
  chartDom.value = document.getElementById('main')
  // 使用echarts.init方法初始化一个图表实例，并将其赋值给myChart.value
  myChart.value = echarts.init(chartDom.value)
  // 调用run函数，传入getChartData(route.query.name||'')的返回值作为参数
  run(getChartData(route.query.name || ''))
})

function run (rawData) {
  const dataWrap = prepareData(rawData)
  initChart(dataWrap.seriesData, dataWrap.maxDepth)
}

function prepareData (rawData) {
  const seriesData = []
  let maxDepth = 0

  function convert (source, basePath, depth) {
    if (source == null) {
      return
    }
    if (maxDepth > 5) {
      return
    }
    maxDepth = Math.max(depth, maxDepth)
    seriesData.push({
      id: basePath,
      value: source.$count || Math.random() * 1000,
      depth,
      index: seriesData.length
    })

    for (const key in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (source.hasOwnProperty(key) && !key.match(/^\$/)) {
        const path = basePath + '.' + key
        convert(source[key], path, depth + 1)
      }
    }
  }

  convert(rawData, 'NPM', 0)

  return {
    seriesData,
    maxDepth
  }
}

function initChart (seriesData, maxDepth) {
  let displayRoot = stratify()

  function stratify () {
    return d3
      .stratify()
      .parentId(function (d) {
        return d.id.substring(0, d.id.lastIndexOf('.'))
      })(seriesData)
      .sum(function (d) {
        return d.value || 0
      })
      .sort(function (a, b) {
        return b.value - a.value
      })
  }

  function overallLayout (params, api) {
    const context = params.context
    d3.pack().size([api.getWidth() - 2, api.getHeight() - 2]).padding(3)(
      displayRoot
    )
    context.nodes = {}
    displayRoot.descendants().forEach(function (node, index) {
      context.nodes[node.id] = node
    })
  }

  function renderItem (params, api) {
    const context = params.context

    if (!context.layout) {
      context.layout = true
      overallLayout(params, api)
    }

    const nodePath = api.value('id')
    const node = context.nodes[nodePath]

    if (!node) {
      return
    }

    const isLeaf = !node.children || !node.children.length
    const focus = new Uint32Array(
      node.descendants().map(function (node) {
        return node.data.index
      })
    )

    const nodeName = isLeaf
      ? nodePath
        .slice(nodePath.lastIndexOf('.') + 1)
        .split(/(?=[A-Z][^A-Z])/g)
        .join('\n')
      : ''

    const z2 = api.value('depth') * 2

    return {
      type: 'circle',
      focus,
      shape: {
        cx: node.x,
        cy: node.y,
        r: node.r
      },
      transition: ['shape'],
      z2,
      textContent: {
        type: 'text',
        style: {
          text: nodeName,
          fontFamily: 'Arial',
          width: node.r * 1.3,
          overflow: 'truncate',
          fontSize: node.r / 3,
          // eslint-disable-next-line no-dupe-keys
          overflow: 'none'
        },
        emphasis: {
          style: {
            overflow: null,
            fontSize: Math.max(node.r / 3, 12)
          }
        }
      },
      textConfig: {
        position: 'inside'
      },
      style: {
        fill: api.visual('color')
      },
      emphasis: {
        style: {
          fontFamily: 'Arial',
          fontSize: 12,
          shadowBlur: 20,
          shadowOffsetX: 3,
          shadowOffsetY: 5,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      }
    }
  }

  // 定义了一个名为option的对象，用于配置图表的选项
  const option = {
    dataset: {
      source: seriesData
    },
    tooltip: {},
    visualMap: [
      {
        show: false,
        min: 0,
        max: maxDepth,
        dimension: 'depth',
        inRange: {
          color: ['#006edd', '#e0ffff']
        }
      }
    ],
    hoverLayerThreshold: Infinity,
    series: {
      type: 'custom',
      renderItem,
      progressive: 0,
      coordinateSystem: 'none',
      encode: {
        tooltip: 'value',
        itemName: 'id'
      }
    }
  }

  myChart.value.setOption(option)

  // 给图表绑定了点击事件的监听器，并在点击时执行相应的逻辑
  myChart.value.on('click', { seriesIndex: 0 }, function (params) {
    drillDown(params.data.id)
  })

  function drillDown (targetNodeId) {
    displayRoot = stratify()
    if (targetNodeId != null) {
      displayRoot = displayRoot.descendants().find(function (node) {
        return node.data.id === targetNodeId
      })
    }
    displayRoot.parent = null
    myChart.value.setOption({
      dataset: {
        source: seriesData
      }
    })
  }

  myChart.value.getZr().on('click', function (event) {
    if (!event.target) {
      drillDown()
    }
  })
}

</script>

<style>
.chart-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.chart-container {
  position: relative;
  width: 1200px;
  height: 800px;
  padding: 0px;
  margin: 0px;
  border-width: 0px;
  cursor: pointer;
}
</style>
