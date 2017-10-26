// import cornify from "cornified"

let intervalId = null

function updateJsonSpec(originalAction) {
  return (...args) => {
    let [spec] = args
    originalAction(...args)

    // spec is a JS object
    if(spec && spec["x-cornify"] && spec["x-cornify"] === true) {
      if(intervalId === null) {
        intervalId = setInterval(() => {
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

export default function SwaggerUICornify() {
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
