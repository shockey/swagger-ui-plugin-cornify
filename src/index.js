import cornify from "cornified"

// Override the Cornified default style

var css = '.cornify { z-index: 100000000; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

let intervalId = null

function updateJsonSpec(originalAction) {
  return (...args) => {
    let [spec] = args
    originalAction(...args)

    // spec is a JS object
    if(spec && spec["x-cornify"] && spec["x-cornify"] === true) {
      if(intervalId === null) {
        intervalId = setInterval(() => {
          if(document.querySelectorAll('.cornify').length > 24) {
            clearInterval(intervalId)
            intervalId = null
            return
          }

          cornify.add()
        }, 1000)
      }
    } else {
      cornify.clear()
      clearInterval(intervalId)
      intervalId = null
    }
  }
}

module.exports = function SwaggerUICornify() {
  return {
    statePlugins: {
      spec: {
        wrapActions: {
          updateJsonSpec
        }
      }
    }
  }
}
