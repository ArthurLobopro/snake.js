const make_header = () => {

    const path = "assets/windowsIcons/"

    const header = document.createElement('div')

    header.id= "electron-header"
    header.innerHTML = `
    <div class="left">
        <div id="window-icon"></div>
        <div id="window-name"></div>
    </div>
    <div class="right">
        <div>
            <img src="${path}traco.png" alt="Minimaze" title="Minimizar" id="minimize">
        </div>
        <div>
            <img src="${path}expand.png" alt="Maximize" title="Expandir" id="expand">
        </div>
        <div>
            <img src="${path}x.png" alt="Close" title="Fechar" id="close">
        </div>
    </div>`
    return header
}
module.exports = make_header