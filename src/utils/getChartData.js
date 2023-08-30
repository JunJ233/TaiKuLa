


import { ref } from 'vue';

import DataF from '../assets/data/targetFilePath.json' 

// ---------------------------------------------------------------------------------------------------------------------
// // 定义一个函数filterTree,用以搜索树中包含name的内容，接受两个参数tree和name
const filterTree = (tree, name) => {
  // 将tree对象转换为字符串再转换回对象，实现深拷贝
  const originData = JSON.parse(JSON.stringify(tree));

  // 定义一个递归函数filter，用于过滤树结构
  const filter = (tree, name) => {
    // 遍历tree对象的所有属性
    for (const key in tree) {
      // 如果属性名不包含name
      if (!key.includes(name)) {
        // 如果属性值是对象类型
        if (typeof tree[key] === 'object') {
          // 递归调用filter函数，继续过滤子树
          filter(tree[key], name);
          // 如果子树过滤后没有属性了，则删除该属性
          if (Object.keys(tree[key]).length === 0) {
            delete tree[key];
          }
        } else {
          // 如果属性值不是对象类型，则删除该属性
          delete tree[key];
        }
      }
    }
  };

  // 调用filter函数，过滤originData树结构
  filter(originData, name);

  // 返回过滤后的树结构
  return originData;
};

const data = ref({
  //ES6拓展运算符
  ...DataF
})

export const getChartData = (name) => {
  // 定义一个对象data，使用展开运算符将DataA、DataD、DataE和DataF的属性合并到data中
  return filterTree(data.value, name);
};

export const setChartData = (uploadData)=>{
  data.value = uploadData
}














// import { ref } from 'vue';

// const data = ref({});
// let filePath = '';

// const fetchData = async (name) => {
//   const dynamicData = await import(`../assets/data/${filePath}`);
//   return filterTree(dynamicData.default, name);
// };

// const filterTree = (tree, name) => {
//   const originData = JSON.parse(JSON.stringify(tree));

//   const filter = (tree, name) => {
//     for (const key in tree) {
//       if (!key.includes(name)) {
//         if (typeof tree[key] === 'object') {
//           filter(tree[key], name);
//           if (Object.keys(tree[key]).length === 0) {
//             delete tree[key];
//           }
//         } else {
//           delete tree[key];
//         }
//       }
//     }
//   };

//   filter(originData, name);

//   return originData;
// };

// export const getChartData = async (name) => {
//   const filteredData = await fetchData(name);
//   data.value = filteredData;
//   return filteredData;
// };

// export const setChartData = (uploadData) => {
//   data.value = uploadData;
// };





// --------------------------------------------------------------------------------