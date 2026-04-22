(function() {
    // 检测移动设备
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) return;

    // 创建容器和画布
    const widget = document.createElement('div');
    widget.id = 'spine-widget';
    widget.innerHTML = '<canvas id="spine-canvas"></canvas>';
    document.body.appendChild(widget);

    // 动态加载 spine-webgl.js
    const spineScript = document.createElement('script');
    spineScript.src = '/spine/spine-webgl.js';
    spineScript.async = true;
    spineScript.onload = function() {
        // 加载完成后加载播放器逻辑
        const playerScript = document.createElement('script');
        playerScript.src = '/spine/spine-player.js';
        document.body.appendChild(playerScript);
    };
    document.body.appendChild(spineScript);
})();



// hexo.extend.injector.register(
//     'body_end', // 注入到页面 body 的末尾
//     `
//   <script>
//     // 检测是否为移动设备
//     function isMobileDevice() {
//       // 通过 userAgent 检测常见的移动设备
//       return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//     }

//     // 如果不是移动设备，则加载 Spine 小部件
//     if (!isMobileDevice()) {
//       const spineWidget = document.createElement("div");
//       spineWidget.id = "spine-widget";
//       spineWidget.innerHTML = '<canvas id="spine-canvas"></canvas>';
//       document.body.appendChild(spineWidget);

//       // 动态加载 Spine 运行时库
//       const spineScript = document.createElement("script");
//       spineScript.src = "/spine/spine-webgl.js";
//       spineScript.async = true;
//       spineScript.onload = function() {
//         // Spine 运行时库加载完成后，初始化 Spine 小部件
//         const canvas = document.getElementById("spine-canvas");
//         canvas.width = 300;
//         canvas.height = 300;

//         // 初始化 Spine 动画逻辑
//         const spineLogicScript = document.createElement("script");
//         spineLogicScript.src = "/spine/spine-player.js";
//         document.body.appendChild(spineLogicScript);
//       };
//       document.body.appendChild(spineScript);
//     }
//   </script>
//   `,
//     'default' // 注入到所有页面
// );

// // 动态加载外置的 CSS 文件（仅在非移动设备时加载）
// hexo.extend.injector.register(
//     'head_end', // 注入到页面 head 的末尾
//     `
//   <script>
//     // 检测是否为移动设备
//     function isMobileDevice() {
//       return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
//     }

//     // 如果不是移动设备，则加载 CSS 文件
//     if (!isMobileDevice()) {
//       const spineCSS = document.createElement("link");
//       spineCSS.rel = "stylesheet";
//       spineCSS.href = "/spine/spine-widget.css";
//       document.head.appendChild(spineCSS);
//     }
//   </script>
//   `,
//     'default' // 注入到所有页面
// );