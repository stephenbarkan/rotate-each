//get the current selection
let selection = figma.currentPage.selection;
//do a rotation for each item
if (selection.length > 0) {
    selection.forEach((item) => {
        // store the items' original parent
        const parent = item.parent;
        //create a new group around the item
        const newGroup = figma.group([item], parent);
        //create a random angle
        const angle = (Math.random() * 2 - 1) * Math.PI;
        //find the center point in x and y of the node
        const halfWidth = newGroup.width / 2;
        const halfHeight = newGroup.height / 2;
        //find the coordinate position of the item's top-left corner relative to its parent
        const x = newGroup.x;
        const y = newGroup.y;
        //find the coordinate position of the item's center relative to its parent
        const centerX = x + halfWidth;
        const centerY = y + halfHeight;
        //calculate the new top-left x and y coordinates
        const xPrime = centerX +
            (x - centerX) * Math.cos(angle) +
            (y - centerY) * Math.sin(angle);
        const yPrime = centerY +
            (y - centerY) * Math.cos(angle) -
            (x - centerX) * Math.sin(angle);
        //apply the transform
        newGroup.relativeTransform = [
            [Math.cos(angle), Math.sin(angle), xPrime],
            [Math.sin(angle) * -1, Math.cos(angle), yPrime],
        ];
        //ungroup the item
        parent.appendChild(item);
    });
    //close the plugin
    figma.closePlugin();
}
else {
    figma.closePlugin("Please select at least one object.");
}
