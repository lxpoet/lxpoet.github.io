/**
 * 标题诗句轮播效果
 * 读取 source/custom/titles.txt 中的诗句，在浏览器标签栏轮流显示
 * 配合博客名称展示：诗句 - 博客名
 */

(function() {
  'use strict';

  // 配置区域
  const CONFIG = {
    interval: 4000,        // 切换间隔（毫秒），4秒
    separator: ' - ',       // 诗句与博客名之间的分隔符
    blogName: 'MlX的博客',  // 博客名称
    enableConsoleLog: false // 是否启用控制台日志（调试用）
  };

  let titles = [];
  let currentIndex = 0;
  let originalTitle = '';

  // 记录原始标题
  originalTitle = document.title;

  // 日志函数
  function log(message) {
    if (CONFIG.enableConsoleLog) {
      console.log('[Titles Rotator] ' + message);
    }
  }

  // 随机打乱数组顺序
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // 更新标题
  function updateTitle() {
    if (titles.length === 0) {
      log('没有找到诗句');
      return;
    }

    const title = titles[currentIndex];
    const newTitle = CONFIG.separator ? title + CONFIG.separator + CONFIG.blogName : title;
    document.title = newTitle;

    log('切换到: ' + title);

    // 更新索引
    currentIndex = (currentIndex + 1) % titles.length;
  }

  // 加载诗句文件
  function loadTitles() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/custom/titles.txt', true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // 按行分割并过滤空行
          titles = xhr.responseText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

          if (titles.length > 0) {
            // 随机打乱顺序
            titles = shuffleArray(titles);
            log('成功加载 ' + titles.length + ' 条诗句');

            // 立即显示第一条，然后开始轮播
            updateTitle();

            // 设置定时器
            setInterval(updateTitle, CONFIG.interval);
          } else {
            log('文件为空或没有有效诗句');
          }
        } else {
          log('加载失败，状态码: ' + xhr.status);
        }
      }
    };

    xhr.onerror = function() {
      log('网络错误，无法加载诗句文件');
    };

    xhr.send();
  }

  // 页面加载完成后启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTitles);
  } else {
    loadTitles();
  }
})();
