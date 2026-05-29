// Constants //
const nodeTemplate = treeNode.content.children[0]; // Used to copy the node template



// Primary app UI management //

/// Event for when a node is clicked
function onNodeElementClick(element, i) {
    console.log(i);
    // Setting up editing popup
    const data = getNode(i);

    editingTitle.value = data.getTitle();
    editingTitle.oninput = _ => {
        element.getElementsByClassName("nodeTitle")[0].innerText = editingTitle.value;
        data.updateText(editingTitle.value);
    };

    editingBody.value = data.getText();
    editingBody.oninput = _ => {
        element.getElementsByClassName("nodePreview")[0].innerText = editingBody.value;
        data.updateText(editingBody.value);
    };
    
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
        button.innerText = "+";
        button.className = "newButton";

        button.onclick = _ => onNewClick(button, i);

        return button;
    }

    // Otherwise create a copy of the template and fill in the information
    const copy = nodeTemplate.cloneNode(true);
    copy.getElementsByClassName("nodeTitle")[0].innerText = node.getTitle();

    copy.onclick = e => {
        onNodeElementClick(copy, i);
        e.stopPropagation();
    }

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
    const inOrder = (text, i) => {
        const node = getNode(i);
        const left = leftBranch(i);
        const right = rightBranch(i);

        if (node === undefined)
            return text;

        text += inOrder(text, left) + node.getText() + inOrder(text, right);

        return text;
    };

    console.log( inOrder("", 0) );
}

