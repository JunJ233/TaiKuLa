const fs = require('fs')
// eslint-disable-next-line semi
const path = require('path');
const { program } = require('commander')
const spawn = require('cross-spawn')


const readPackageJson = (pkgPath) => {
try {
      const packageJson = fs.readFileSync(pkgPath, 'utf8')
      return JSON.parse(packageJson)
    } catch (error) {
      console.error('Error reading package.json:', error);
      return null;
    }
  };
  
  const generateDependencyGraph = async (dependencies, graph, visited = new Set(), depthLimit) => {
    graph = graph || {};
  
    for (const dependency in dependencies) {
      if (!graph[dependency]) {
        if (visited.has(dependency)) {
          console.warn(`Circular dependency detected: ${dependency}`);
          continue;
        }
        graph[dependency] = {};
  
        if (depthLimit > 0) {
          const subPackageJsonPath = path.resolve(`node_modules/${dependency}/package.json`);
          const subPackageDependencies = readPackageJson(subPackageJsonPath)?.dependencies;
  
          visited.add(dependency);
          await generateDependencyGraph(subPackageDependencies, graph[dependency], visited, depthLimit - 1);
          visited.delete(dependency);
        }
      }
    }
  
    return graph;
  };
  
  const saveDependencyGraph = (dependencyGraph, filePath) => {
    const json = JSON.stringify(dependencyGraph, null, 2);
    fs.writeFileSync(filePath, json);

  };
  function runDev() {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`npm run dev exited with code ${code}`));
      }
    });
  });
}
  
program
.command('dependency')
.description('Generate dependency graph')
.option('-d, --depth <depth>', 'Set the depth limit', parseInt)
.action(async ({ depth, output }) => {
    if (depth <= 0) {
      console.log('Depth must be greater or equal to 0');
      return;
    }
  
    const packageJsonPath = path.resolve('./package.json');
    const packageJson = readPackageJson(packageJsonPath);
  
    const dependencyGraph = await generateDependencyGraph(packageJson.dependencies, null, new Set(), depth);
    // saveDependencyGraph(dependencyGraph, output);
    const targetFilePath = 'src/assets/data/targetFilePath.json';  // 设置目标文件路径
    saveDependencyGraph(dependencyGraph, targetFilePath);  // 调用保存函数保存依赖关系图到目标文件
    runDev()
  
  });



program
.version('1.0.0')
.command('generate')
.description('Generate dependecy json')
.option('-d, --depth <depth>', 'Set the depth limit', parseInt)
.option('-j, --json <json>', 'Set the output file path')
.action(async ({ depth, json }) => {
  if (depth <= 0) {
    console.log('Depth must be greater or equal to 0');
    return;
  }

  const packageJsonPath = path.resolve('./package.json');
  const packageJson = readPackageJson(packageJsonPath);

  const dependencyGraph = await generateDependencyGraph(packageJson.dependencies, null, new Set(), depth);
  saveDependencyGraph(dependencyGraph, json);
  console.log('Dependency graph saved to file:',json);
  const targetFilePath = 'src/assets/data/targetFilePath.json';  // 设置目标文件路径
  saveDependencyGraph(dependencyGraph, targetFilePath);  // 调用保存函数保存依赖关系图到目标文件
//   runDev()

// eslint-disable-next-line semi
});
program.parse(process.argv);