const newcolor = (color1, color2, percentage) => {
    color1 = color1 || '000000';
    color2 = color2 || 'ffffff';
    percentage = percentage || 0.5;

    color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
    color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];

    let color3 = [
        (1 - percentage) * color1[0] + percentage * color2[0],
        (1 - percentage) * color1[1] + percentage * color2[1],
        (1 - percentage) * color1[2] + percentage * color2[2]
    ];

    color3 = int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);

    return color3;
}


const int_to_hex = num => {
    let hex = Math.round(num).toString(16);
    if (hex.length == 1)
        hex = '0' + hex;
    return hex;
}