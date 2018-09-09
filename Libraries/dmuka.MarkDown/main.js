// Create namespace
if (window["dmuka"] === undefined) {
    window["dmuka"] = {};
}

dmuka.MarkDown = function (text) {
    var me = this;

    // Declare Access Modifiers
    var private = {
        variable: {},
        event: {},
        function: {}
    };
    var public = this;

    /* Variables --BEGIN */
    // --------------------

    private.variable.text = text;
    private.variable.hideTextsForRow = [];

    // --------------------
    /* Variables --END */

    /* Functions --BEGIN */
    // --------------------

    // Remove "<" and ">" character
    private.function.clearHTMLInjection = function (row) {
        var html = "";
        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];

            if (char === '<') {
                char = "&lt;";
            }

            html += char;
        }

        return html;
    };

    // " " convert to "&nbsp;"
    private.function.addSpacesToRow = function (row) {
        var html = "";
        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];

            if (char === ' ') {
                char = "&nbsp;";
            }

            html += char;
        }

        return html;
    };

    // Hide attributes like href, src, alt, ...
    private.function.getHideTextForRow = function (data) {
        private.variable.hideTextsForRow.push(data);
        return "?hideText" + private.variable.hideTextsForRow.length + "?";
    };

    // Add to hide text to row
    private.function.addHideTextsToRow = function (row) {
        for (var hideTextIndex = 0; hideTextIndex < private.variable.hideTextsForRow.length; hideTextIndex++) {
            row = row.replace("?hideText" + (hideTextIndex + 1) + "?", private.variable.hideTextsForRow[hideTextIndex]);
        }

        return row;
    };

    // Convert bolds text
    private.function.convertBolds = function (row) {
        var html = "";
        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];
            var nextChar = charIndex + 1 < row.length ? row[charIndex + 1] : undefined;
            var nextNextChar = charIndex + 2 < row.length ? row[charIndex + 2] : undefined;

            if (nextNextChar !== '&' && ((char === '*' && nextChar === '*') || (char === '_' && nextChar === '_'))) {
                html += "<b>";
                charIndex += 2;

                var boldComplate = false;
                for (var subCharIndex = charIndex; subCharIndex < row.length; subCharIndex++) {
                    charIndex = subCharIndex;

                    var subChar = row[subCharIndex];
                    var nextSubChar = subCharIndex + 1 < row.length ? row[subCharIndex + 1] : undefined;

                    if ((subChar === '*' && nextSubChar === '*') || (subChar === '_' && nextSubChar === '_')) {
                        html += "</b>";
                        boldComplate = true;
                        charIndex++;
                        break;
                    }
                    else {
                        html += subChar;
                    }
                }

                if (boldComplate === false) {
                    html += "</b>";
                }
            }
            else {
                html += char;
            }
        }

        return html;
    };

    // Convert italic text
    private.function.convertItalics = function (row) {
        var html = "";
        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];
            var nextChar = charIndex + 1 < row.length ? row[charIndex + 1] : undefined;

            if (nextChar !== '&' && (char === '*' || char === '_')) {
                html += "<i>";
                charIndex++;

                var italicComplate = false;
                for (var subCharIndex = charIndex; subCharIndex < row.length; subCharIndex++) {
                    charIndex = subCharIndex;

                    var subChar = row[subCharIndex];

                    if (subChar === '*' || subChar === '_') {
                        html += "</i>";
                        italicComplate = true;
                        break;
                    }
                    else {
                        html += subChar;
                    }
                }

                if (italicComplate === false) {
                    html += "</i>";
                }
            }
            else {
                html += char;
            }
        }

        return html;
    };

    // Convert strikethrough text
    private.function.convertStrikethrough = function (row) {
        var html = "";
        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];
            var nextChar = charIndex + 1 < row.length ? row[charIndex + 1] : undefined;
            var nextNextChar = charIndex + 2 < row.length ? row[charIndex + 2] : undefined;

            if (nextNextChar !== '&' && (char === '~' && nextChar === '~')) {
                html += "<s>";
                charIndex += 2;

                var boldComplate = false;
                for (var subCharIndex = charIndex; subCharIndex < row.length; subCharIndex++) {
                    charIndex = subCharIndex;

                    var subChar = row[subCharIndex];
                    var nextSubChar = subCharIndex + 1 < row.length ? row[subCharIndex + 1] : undefined;

                    if ((subChar === '~' && nextSubChar === '~')) {
                        html += "</s>";
                        boldComplate = true;
                        charIndex++;
                        break;
                    }
                    else {
                        html += subChar;
                    }
                }

                if (boldComplate === false) {
                    html += "</s>";
                }
            }
            else {
                html += char;
            }
        }

        return html;
    };

    // Convert images
    private.function.convertImages = function (row) {
        var getLink = function (subText, charIndex) {
            var result = {
                alt: "",
                src: "",
                lastCharIndex: charIndex
            };

            var complated = false;
            for (var subTextCharIndex = charIndex; subTextCharIndex < subText.length; subTextCharIndex++) {
                var subTextChar = subText[subTextCharIndex];
                var subTextNextChar = subTextCharIndex + 1 < row.length ? subText[subTextCharIndex + 1] : undefined;

                if (subTextChar === ']' && subTextNextChar === '(') {
                    subTextCharIndex += 2;

                    var parenthesisCounter = 0;
                    for (var subSubTextCharIndex = subTextCharIndex; subSubTextCharIndex < subText.length; subSubTextCharIndex++) {
                        var subSubTextChar = subText[subSubTextCharIndex];

                        if (subSubTextChar === '(') {
                            parenthesisCounter++;
                        }

                        if (parenthesisCounter === 0 && subSubTextChar === ')') {
                            result.lastCharIndex = subSubTextCharIndex;
                            complated = true;
                            break;
                        }
                        else if (parenthesisCounter > 0 && subSubTextChar === ')') {
                            parenthesisCounter--;
                            result.src += subSubTextChar;
                        }
                        else {
                            result.src += subSubTextChar;
                        }

                    }

                    if (complated === true) {
                        break;
                    }
                }
                else {
                    result.alt += subTextChar;
                }
            }

            return result;
        };

        var html = "";
        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];
            var nextChar = charIndex + 1 < row.length ? row[charIndex + 1] : undefined;
            var nextNextChar = charIndex + 2 < row.length ? row[charIndex + 2] : undefined;

            if (nextNextChar !== '&' && (char === '!' && nextChar === '[')) {
                charIndex += 2;

                var link = getLink(row, charIndex);
                if (link.lastCharIndex !== charIndex) {
                    var DOMimg = document.createElement("img");

                    DOMimg.setAttribute("src", private.function.getHideTextForRow(link.src));
                    DOMimg.setAttribute("alt", private.function.getHideTextForRow(link.alt));

                    html += DOMimg.outerHTML;
                    charIndex = link.lastCharIndex;
                }
                else {
                    charIndex -= 2;
                    html += char;
                }
            }
            else {
                html += char;
            }
        }

        return html;
    };

    // Convert links
    private.function.convertLinks = function (row) {
        var getLink = function (subText, charIndex) {
            var result = {
                row: "",
                href: "",
                lastCharIndex: charIndex
            };

            var complated = false;
            for (var subTextCharIndex = charIndex; subTextCharIndex < subText.length; subTextCharIndex++) {
                var subTextChar = subText[subTextCharIndex];
                var subTextNextChar = subTextCharIndex + 1 < row.length ? subText[subTextCharIndex + 1] : undefined;

                if (subTextChar === ']' && subTextNextChar === '(') {
                    subTextCharIndex += 2;

                    var parenthesisCounter = 0;
                    for (var subSubTextCharIndex = subTextCharIndex; subSubTextCharIndex < subText.length; subSubTextCharIndex++) {
                        var subSubTextChar = subText[subSubTextCharIndex];

                        if (subSubTextChar === '(') {
                            parenthesisCounter++;
                        }

                        if (parenthesisCounter === 0 && subSubTextChar === ')') {
                            result.lastCharIndex = subSubTextCharIndex;
                            complated = true;
                            break;
                        }
                        else if (parenthesisCounter > 0 && subSubTextChar === ')') {
                            parenthesisCounter--;
                            result.href += subSubTextChar;
                        }
                        else {
                            result.href += subSubTextChar;
                        }

                    }

                    if (complated === true) {
                        break;
                    }
                }
                else {
                    result.row += subTextChar;
                }
            }

            return result;
        };

        var html = "";
        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];
            var nextChar = charIndex + 1 < row.length ? row[charIndex + 1] : undefined;

            if (nextChar !== '&' && char === '[') {
                charIndex++;

                var link = getLink(row, charIndex);
                if (link.lastCharIndex !== charIndex) {
                    var DOMa = document.createElement("a");
                    DOMa.setAttribute("href", private.function.getHideTextForRow(link.href));
                    DOMa.innerHTML = link.row;

                    html += DOMa.outerHTML;
                    charIndex = link.lastCharIndex;
                }
                else {
                    charIndex--;
                    html += char;
                }
            }
            else {
                html += char;
            }
        }

        return html;
    };

    // Convert space level(Each 2 space = 1 level. For example 4 space = 2 level)
    private.function.getLevel = function (row) {
        var spaceCount = 0;
        var existsOtherCharacter = false;

        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];

            if (char === ' ') {
                spaceCount++;
            }
            else {
                existsOtherCharacter = true;
                break;
            }
        }

        if (existsOtherCharacter === true) {
            return Math.floor(spaceCount / 2);
        }
        else {
            return -1;
        }
    };

    // Add space by level
    private.function.addLevelToRow = function (row, level) {
        if (level < 2) {
            return row;
        }

        var DOMcode = document.createElement("code");
        DOMcode.innerHTML = row;

        return DOMcode.outerHTML;
    };

    // Convert header text
    private.function.convertHeader = function (row) {
        var headerCounter = 0;
        var existsSpace = false;

        for (var charIndex = 0; charIndex < row.length; charIndex++) {
            var char = row[charIndex];

            if (char === '#') {
                headerCounter++;
            }
            else {
                existsSpace = row.substring(charIndex, 6 + charIndex) === '&nbsp;';
                break;
            }
        }

        if (existsSpace === true && headerCounter > 0) {
            var headerTextOriginal = row.substring(headerCounter + 1 + 5);

            var DOMa = document.createElement("a");
            var headerTextForList = headerTextOriginal;
            DOMa.innerHTML = headerTextForList;
            headerTextForList = DOMa.innerText;
            DOMa.innerHTML = "";
            DOMa.setAttribute("name", headerTextForList.split(' ').join('-').split(' ').join('-'));

            var DOMh = document.createElement("h" + Math.min(headerCounter, 6));
            DOMh.innerHTML = headerTextOriginal;

            return DOMa.outerHTML + DOMh.outerHTML;
        }
        else {
            return row;
        }
    };

    // Convert block quote text
    private.function.convertBlockQuote = function (row) {
        if (row.substring(0, 2) === '> ') {
            var DOMblockquote = document.createElement("blockquote");
            DOMblockquote.innerHTML = row.substring(2);

            var result = {
                complate: true,
                html: DOMblockquote.outerHTML
            };
            return result;
        }
        else {
            var result = {
                complate: false
            };
            return result;
        }
    };

    // Convert line
    private.function.convertLine = function (row) {
        if (row.substring(0, 3) === '---') {
            var DOMhr = document.createElement("hr");

            var result = {
                complate: true,
                html: DOMhr.outerHTML
            };
            return result;
        }
        else {
            var result = {
                complate: false
            };
            return result;
        }
    };

    // Convert checkbox
    private.function.convertCheckbox = function (row) {
        if (row.substring(0, 7) === ' - [ ] ') {
            var DOMcheckox = document.createElement("input");
            DOMcheckox.setAttribute("type", "checkbox");
            DOMcheckox.setAttribute("disabled", "");

            var result = {
                complate: true,
                html: DOMcheckox.outerHTML + " " + row.substring(7)
            };
            return result;
        }
        else if (row.substring(0, 7) === ' - [x] ') {
            var DOMcheckox = document.createElement("input");
            DOMcheckox.setAttribute("type", "checkbox");
            DOMcheckox.setAttribute("checked", "");
            DOMcheckox.setAttribute("disabled", "");

            var result = {
                complate: true,
                html: DOMcheckox.outerHTML + " " + row.substring(7)
            };
            return result;
        }
        else {
            var result = {
                complate: false
            };
            return result;
        }
    };

    // Row is list?
    private.function.getIsList = function (row) {
        if (row.substring(0, 7) === ' - [ ] ' || row.substring(0, 7) === ' - [x] ') {
            return false;
        }
        return ((row.indexOf('.') > 0 && parseInt(row.split('.')[0]) >= 0) || row.substring(0, 2) === '- ' || row.substring(0, 3) === ' - ') || (row.substring(0, 2) === '+ ' || row.substring(0, 3) === ' + ') || (row.substring(0, 2) === '* ' || row.substring(0, 3) === ' * ');
    };

    // Clear list characters
    private.function.clearList = function (row) {
        if (row.substring(0, 2) === '- ' || row.substring(0, 2) === '+ ' || row.substring(0, 2) === '* ') {
            return row.substring(2);
        }
        else if (row.substring(0, 3) === ' - ' || row.substring(0, 3) === ' + ' || row.substring(0, 3) === ' * ') {
            return row.substring(3);
        }
        else if (row.indexOf('.') > 0 && parseInt(row.split('.')[0]) >= 0) {
            return row.split('.')[1];
        }
        return row;
    };

    // Add </ul> to end of row
    private.function.addLineEnd = function (row, count, type) {
        for (var countIndex = 0; countIndex < count + 1; countIndex++) {
            row += "</" + type + ">";
        }
        return row;
    };

    // Row is table?
    private.function.getIsTable = function (row) {
        return row.split('|').length > 2;
    };

    // Column is success for draw table?
    private.function.getIsCol = function (column) {
        if (column.length === 0) {
            return false;
        }

        var existsColumnData = false;
        for (var charIndex = 0; charIndex < column.length; charIndex++) {
            var char = column[charIndex];

            if(char === '-'){
                existsColumnData = true;
            }
            if ((char !== '-' && char !== ':') || ((charIndex !== 0 && charIndex !== column.length - 1) && char === ':')) {
                return false;
            }
        }
        return existsColumnData;
    };

    private.function.getTableColumnsAlign = function(columns) {
        var aligns = [];
        for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            var column = columns[columnIndex];

            if(column[0] === ':' && column[column.length - 1] === ':'){
                aligns.push("center");
            }
            else if(column[0] === ':' && column[column.length - 1] !== ':') {
                aligns.push("left");
            }
            else if(column[0] !== ':' && column[column.length - 1] === ':') {
                aligns.push("right");
            }
            else {
                aligns.push("");
            }
        }

        return aligns;
    };

    // Get new table row with columns
    private.function.getTableRow = function (columns, columnType, tableAligns) {
        var html = "";
        html += "<tr>";
        for (var columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            var column = columns[columnIndex];
            var align = tableAligns[columnIndex];

            html += "<" + columnType + " align='" + align + "'>";

            var checkbox = private.function.convertCheckbox(column);
            if (checkbox.complate === true) {
                column = checkbox.html;
            }

            if (checkbox.complate === false) {
                column = private.function.addSpacesToRow(column);
            }

            column = private.function.convertImages(column);
            column = private.function.convertLinks(column);

            column = private.function.convertHeader(column);

            column = private.function.convertBolds(column);
            column = private.function.convertItalics(column);
            column = private.function.convertStrikethrough(column);

            column = private.function.addHideTextsToRow(column);

            html += column;

            html += "</" + columnType + ">";
        }
        html += "</tr>";

        return html;
    };

    private.function.init = function () {
        var rows = text.split('\n');
        var html = "";

        // For list elements
        var listType = "ul";
        var listLevel = -1;

        // For table elements
        var tableFirstRowColumns = [];
        var tablePreviousRowVersion = "";
        var tableActive = false;
        var tableHeader = false;
        var tableControl = false;
        var tableAligns = [];

        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            var row = rows[rowIndex];
            private.variable.hideTextsForRow = [];

            // Empty row status
            if (row === '') {
                if (tableActive === true) {
                    html += "</table>";
                }
                tableActive = false;
                tableHeader = false;
                tableControl = false;
                tableFirstRowColumns = [];
                tablePreviousRowVersion = "";
                tableAligns = [];

                html = private.function.addLineEnd(html, listLevel, listType);
                listLevel = -1;

                if (rowIndex !== rows.length - 1) {
                    html += "<br/>";
                }
                continue;
            }

            // Row is table
            if (private.function.getIsTable(row) === true) {
                if (tableActive === false) {
                    html += "<table>";
                }
                tableActive = true;

                var columns = row.split('|');
                columns.splice(0, 1);
                if (tableControl === false && tableHeader === true && private.function.getIsCol(columns[0]) === true) {
                    tableAligns = private.function.getTableColumnsAlign(columns);

                    html += private.function.getTableRow(tableFirstRowColumns, "th", tableAligns);
                    tableFirstRowColumns = [];
                    tablePreviousRowVersion = "";
                    tableControl = true;
                }
                else if (tableControl === false && tableHeader === true && private.function.getIsCol(columns[0]) === false) {
                    html += tablePreviousRowVersion + "<br/>";
                    html += row;
                    tableFirstRowColumns = [];
                    tablePreviousRowVersion = "";
                    tableActive = false;
                    tableHeader = false;
                }
                else if (tableHeader === false) {
                    tableFirstRowColumns = columns;
                    tablePreviousRowVersion = row;
                    tableHeader = true;
                }
                else if (tableControl === true) {
                    html += private.function.getTableRow(columns, "td", tableAligns);
                }

                continue;
            }
            else {
                if (tableActive === true) {
                    html += "</table>";
                }
                tableActive = false;
                tableHeader = false;
                tableControl = false;
                tableFirstRowColumns = [];
                tablePreviousRowVersion = "";
                tableAligns = [];
            }

            // Row is block quote
            var blockQuote = private.function.convertBlockQuote(row);
            if (blockQuote.complate === true) {
                html = private.function.addLineEnd(html, listLevel, listType);
                listLevel = -1;

                html += blockQuote.html;

                if (rowIndex !== rows.length - 1) {
                    html += "<br/>";
                }
                continue;
            }

            // Row is line
            var line = private.function.convertLine(row);
            if (line.complate === true) {
                html = private.function.addLineEnd(html, listLevel, listType);
                listLevel = -1;

                html += line.html;

                if (rowIndex !== rows.length - 1) {
                    html += "<br/>";
                }
                continue;
            }

            var level = private.function.getLevel(row);
            if (level !== -1) {
                var rowWithoutLevel = row.substring(2 * level);
                if (level >= 2)
                    row = row.substring(4);

                row = private.function.clearHTMLInjection(row);

                // Row is list
                var rowIsList = private.function.getIsList(rowWithoutLevel);
                if (rowIsList === true) {
                    if (listLevel !== level) {
                        if (listLevel < level) {
                            listLevel++;
                            listType = (rowWithoutLevel.indexOf('.') > 0 && parseInt(rowWithoutLevel.split('.')[0]) >= 0) ? "ol" : "ul";
                            html += "<" + listType + ">";
                        }
                        else {
                            html = private.function.addLineEnd(html, listLevel - level - 1, type);
                            listLevel = level;
                        }
                    }

                    html += "<li>";
                    row = private.function.clearList(rowWithoutLevel);
                }
                else {
                    html = private.function.addLineEnd(html, listLevel, listType);
                    listLevel = -1;
                }

                // Row is checkbox
                var checkbox = private.function.convertCheckbox(row);
                if (checkbox.complate === true) {
                    row = checkbox.html;
                }

                if (checkbox.complate === false) {
                    row = private.function.addSpacesToRow(row);
                    row = private.function.addLevelToRow(row, level);
                }

                row = private.function.convertImages(row);
                row = private.function.convertLinks(row);

                row = private.function.convertHeader(row);

                row = private.function.convertBolds(row);
                row = private.function.convertItalics(row);
                row = private.function.convertStrikethrough(row);

                row = private.function.addHideTextsToRow(row);

                if (rowIsList === true) {
                    row += "</li>";
                }

                html += row;
            }

            // Row end
            if (rowIndex !== rows.length - 1 && listLevel === -1) {
                html += "<br/>";
            }
        }

        return html;
    };

    // --------------------
    /* Functions --END */

    return private.function.init();
};