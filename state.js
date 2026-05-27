/// Data "nodes" that are stored within the binary tree - includes a history of document changes 
class NodeData {
    constructor(title, data) {
        this.title = title;
        this.history = data;
    }

    getHistory() {
        return this.history;
    }

    getText() {
        if (this.history.length == 0)
            return "";
        return this.history[this.history.length - 1];
    }

    updateText(text) {
        this.history.push(text);
    }

    getTitle() {
        return this.title;
    }

    updateTitle(title) {
        this.title = title;
    }
}

// Binary tree state
var tree = [];

/// Takes the left branch of index i on the binary tree
function leftBranch(i) {
    return (2 * i) + 1;
}

/// Takes the right branch of index i on the binary tree
function rightBranch(i) {
    return (2 * i) + 2;
}


/// Retrieves the number of nodes in the binary tree
function getNodeCount() {
    return tree.length;
}

/// Retrieves the node at position i in the binary tree
function getNode(i) {
    return tree[i];
}

/// Sets the node value at position i in the binary tree
function setNode(i, value) {
    tree[i] = value === undefined ? new NodeData("Empty Title", []) : value;
}

/// Removes a node and its children from the state
function removeNode(i) {
    tree[i] = undefined;

    // Recurse into left and right positions if they fall within the range of the array
    const left = leftBranch(i);     // FIXME: There is an issue where the "size" returned by getNodeCount() will remain the same after the remove operation - because we can't just go deleting from i onwards since other nodes might be occupying that space
    const right = rightBranch(i);

    if (left < getNodeCount()) {
        removeNode(left);
    }

    if (right < getNodeCount()) {
        removeNode(right);
    }
}
