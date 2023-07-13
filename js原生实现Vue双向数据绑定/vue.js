class Vue {
    constructor(options) {
        this.$el = document.querySelector(options.el)
        this.$options = options
        this.$data = options.data
        this.compile(this.$el)
    }
    compile(node) {
        node.childNodes.forEach((item, index) => {
            // nodeType  1表示元素节点  3表示文本节点
            if (item.nodeType === 1) {
                // 判断是否有'@click'这个属性
                if (item.hasAttribute('@click')) {
                    // 获取该属性
                    let vmKey = item.getAttribute('@click')
                    // 去掉字符串前后空格
                    vmKey = vmKey.trim()
                    // 为节点绑定事件监听
                    item.addEventListener('click',()=>{
                        // 运行methods中的方法回调
                        this.$options.methods[vmKey]()
                    })
                }
                // 判断是否有子节点   避免空节点不必要的性能消耗
                if (item.childNodes.length > 0) {
                    // 递归回调
                    this.compile(item)
                }
            }
            if (item.nodeType === 3) {
                let reg = /\{\{(.*?)\}\}/g
                let text = item.textContent
                // 替换{{}}中的文本
                item.textContent = text.replace(reg, (match, vmKey) => {
                    vmKey = vmKey.trim()
                    return this.$data[vmKey]
                })
            }
        })
    }
}