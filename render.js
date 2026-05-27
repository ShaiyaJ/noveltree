// Constants //
const nodeTemplate = treeNode.content.children[0]; // Used to copy the node template



// Primary app UI management //

/// Event for when a node is clicked
function onNodeElementClick(i) {
    // Setting up editing popup
    const data = getNode(i);

    editingTitle.value = data.getTitle();
    editingTitle.addEventListener("onpropertychange", _ => data.updateText(editingTitle.value));

    editingBody.value = data.getText();
    editingTitle.addEventListener("onpropertychange", _ => data.updateText(editingBody.value));
    
    // Displaying popup
    editingPopup.showModal();
}

/// Event for when a new node button is clicked
function onNewClick(element, i) {
    // Update state
    setNode(i);

    const newElement = createNodeElement(i)
    element.replaceWith(newElement);

    // Add new button to the element's child
    const target = newElement.getElementsByClassName("nodeChildren")[0];

    target.appendChild( createNodeElement(leftBranch(i)) );
    target.appendChild( createNodeElement(rightBranch(i)) );
}

/// Creates a UI element from a node
function createNodeElement(i) {
    const node = getNode(i);
    
    // Create a button if the node doesn't exist in the backend
    if (node === undefined) { 
        const button = document.createElement("button");
        button.className = "newButton";

        button.onclick = _ => onNewClick(button, i);

        return button;
    }

    // Otherwise create a copy of the template and fill in the information
    const copy = nodeTemplate.cloneNode(true);
    copy.getElementsByClassName("nodeTitle")[0].innerText = node.getTitle();

    copy.onclick = _ => onNodeElementClick(i);

    return copy;
}

// Bootstrapping UI
const root = createNodeElement(0);

projectControls.appendChild(root);
onNewClick(root, 0);



// Menu bar controls //

loadBtn.onclick = _ => {
    console.log("load");
};

saveBtn.onclick = _ => {
    console.log("save");
};

exportBtn.onclick = _ => {
    console.log("export");
}
