const svgElm = document.querySelector('#test_svg');
const data = new XMLSerializer().serializeToString(svgElm);
var blob = new Blob([data], { type: 'image/svg+xml' });
var svgUrl = (window.URL || window.webkitURL || window).createObjectURL(blob);
var svgWidth = svgElm.getAttribute('width');
var svgHeight = svgElm.getAttribute('height');

var embeddedImages = document.querySelectorAll('#test_svg image');
// 由 nodeList 转为 array
embeddedImages = Array.prototype.slice.call(embeddedImages);

// 加载底层的图
loadImage(svgUrl).then(
  function (img) {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

    canvas.width = svgWidth;
    canvas.height = svgHeight;

    ctx.drawImage(img, 0, 0);
    // 遍历 svg 里面所有的 image 元素
    embeddedImages
      .reduce(function (sequence, svgImg) {
        return sequence.then(
          function () {
            var url = svgImg.getAttribute('xlink:href') + 'abc',
              dX = svgImg.getAttribute('x'),
              dY = svgImg.getAttribute('y'),
              dWidth = svgImg.getAttribute('width'),
              dHeight = svgImg.getAttribute('height');

            return loadImage(url).then(
              function (sImg) {
                ctx.drawImage(
                  sImg,
                  0,
                  0,
                  sImg.width,
                  sImg.height,
                  dX,
                  dY,
                  dWidth,
                  dHeight
                );
              },
              function (err) {
                console.log(err);
              }
            );
          },
          function (err) {
            console.log(err);
          }
        );
      }, Promise.resolve())
      .then(function () {
        // 准备在前端下载
        var a = document.createElement('a');
        a.download = 'download.png';
        a.href = canvas.toDataURL('image/png');

        var clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false,
        });

        a.dispatchEvent(clickEvent);
      });
  },
  function (err) {
    console.log(err);
  }
);

// 加载 image
function loadImage(url) {
  return new Promise(function (resolve, reject) {
    var image = new Image();

    image.src = url;
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
      resolve(this);
    };

    image.onerror = function (err) {
      reject(err);
    };
  });
}
