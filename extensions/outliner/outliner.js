// 大纲图标按钮点击事件
function toggleOutline() {
  var myDiv = document.getElementsByClassName("outline")[0];
  if (myDiv.style.display === "none") {
    myDiv.style.display = "block";
  } else {
    myDiv.style.display = "none";
  }
}

// 添加大纲按钮
function setOutlineButton() {
  // 判断大纲按钮是否存在
  var outlineButton = document.querySelectorAll(".outlineButton");
  if (outlineButton.length == 0) {
    // 获取具有 class="side right" 的元素
    var sideRightDiv = document.querySelector(".side.right");
    // 创建新的元素
    var newElement = document.createElement("div"); // 例如，创建一个段落元素

    newElement.className = "icon toggle big outlineButton";
    // 在具有 class="side right" 的元素下插入新元素
    sideRightDiv.appendChild(newElement);
    // 获取按钮元素
    var myButton = document.getElementsByClassName("outlineButton")[0];

    // 添加事件监听器
    myButton.addEventListener("click", function () {
      toggleOutline();
    });
  }
}

// 获取outline内容
function getOutline() {
  // 获取所有headers
  var headers = document.querySelectorAll(
    ".textHeader1, .textHeader2, .textHeader3, .textHeader4, .textHeader5, .textHeader6"
  );

  headers.forEach((header) => {
    parseInt(header.className.split(" ")[2].slice(-1));
  });

  let outlineHTML = "<ul>";

  headers.forEach((header, index) => {
    // 获取每个headers的header号
    let level = parseInt(header.className.split(" ")[2].slice(-1));

    // 构建链接
    outlineHTML += `<li  style="list-style:none;margin-left: ${
      level * 15
    }px;"><a href="#${header.id}">${header.innerText}</a></li>`;
  });

  outlineHTML += "</ul>";

  outlineHTML =
    `<div
    class="right"
    style="position:fixed;width: 150px; top: 150px; height: 100px;right:10px"
  ><div class="over">
<div class="body">` +
    outlineHTML +
    `</div>
</div>
</div>
`;
  return outlineHTML;
}

var tempOutline;
// 更新outline
function updateOutline() {
  setOutlineButton();
  let outline = getOutline();

  // 1. 获取具有指定 ID 的元素
  const targetElement = document.getElementById("editorWrapper");

  // 判断是否存在
  var outlines = document.querySelectorAll(".outline");

  if (outlines.length == 0) {
    // 3. 不存在的时候将新创建的 div 添加到指定的元素下
    const newDiv = document.createElement("div");
    newDiv.innerHTML = outline; // 为新的 div 设置内容
    newDiv.classList.add("outline"); // 可选：为新的 div 添加类名
    newDiv.className = "outline";

    targetElement.appendChild(newDiv);
  } else {
    // 增加判断header是否有变化，变化才进行生成大纲
    if (tempOutline == outline) {
      return;
    }
    tempOutline = outline;

    // 2. 创建一个新的 div 元素
    const newDiv = document.createElement("div");
    newDiv.innerHTML = outline; // 为新的 div 设置内容
    newDiv.classList.add("outline"); // 可选：为新的 div 添加类名
    newDiv.className = "outline";

    let outlineContainer = outlines[0];
    const scrollTop = outlineContainer.scrollTop;

    // 使用新容器替换旧容器
    outlineContainer.parentNode.replaceChild(newDiv, outlineContainer);

    // 更新引用，使后续的更新仍然有效
    outlineContainer = newDiv;

    // outlineContainer.scrollTop = scrollTop;
  }
}

// 防抖函数，避免修改header的时候不断刷新outline
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
const debouncedUpdate = debounce(updateOutline, 300);

// 监听header的变化
const observer = new MutationObserver((mutations) => {
  debouncedUpdate();
});

const config = { childList: true, subtree: true, characterData: true };

observer.observe(document.body, config);
