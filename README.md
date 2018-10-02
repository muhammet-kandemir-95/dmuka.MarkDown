# dmuka.MarkDown (JavaScript Library for Web Sites)
 Demo : http://www.bilgisayarafisildayanadam.com/dmuka.MarkDown/

 By using this library, you can support MD format scripts in your projects, and enable your users take notes with further functions.
 
 The usage of "_dmuka.MarkDown_" project, highly successful in **speed**, is quite simple.
 
#### Example Usage
```javascript
var html = dmuka.MarkDown.Convert(<md-text>);
```

 Supports many _MD_ features.
 
## Supported Features

### Bold
 Enables bold font.
 
#### Example Usage
```markdown
**text**
__text__
```

### Italic
 Enables italic font.
 
#### Example Usage
```markdown
*text*
_text_
```

### Header
 Enables headline.
 
#### Example Usage
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Strikethrough
 Enables crossing out.
 
#### Example Usage
```markdown
~~text~~
```

### Unordered List
 Enables listing.
 
#### Example Usage
```markdown
- List1 Item 1
- List1 Item 2
- List1 Item 3

* List2 Item 1
* List2 Item 2
* List2 Item 3

+ List3 Item 1
+ List3 Item 2
+ List3 Item 3
```

### Ordered List
 Enables numbering.
 
#### Example Usage
```markdown
1. List1 Item 1
2. List1 Item 2
3. List1 Item 3

1. List2 Item 1
1. List2 Item 2
1. List2 Item 3
```

### Checkbox
 Enables check box.
 
#### Example Usage
```markdown
 - [ ] Unchecked Item
 - [x] Checked Item
```

### Line
 Enables lining.
 
#### Example Usage
```markdown
---
```

### Blockquote
 Activates “_Blockquote_” feature on text.
 
#### Example Usage
```markdown
>  Hello World
>  This is so fast!
```

### Code
 Activates "_Code_" feature on text
 
#### Example Usage
```markdown
    This is code line!
```

### Table
 Activates "_Table_" feature on text.
 
#### Example Usage
```markdown
|   Column1   |   Column2   |   Column3   |   Column4   |
|:--|:--:|--:|--|
|   Row 1 Text 1   |   Row 1 Text 2   |   Row 1 Text 3   |   Row 1 Text 4   |
|   Row 2 Text 1   |   Row 2 Text 2   |   Row 2 Text 3   |   Row 2 Text 4   |
|   Unneccessary Text For Show Text Align   |   Unneccessary Text For Show Text Align   |   Unneccessary Text For Show Text Align   |   Unneccessary Text For Show Text Align   |
```

### Link
 Enables linking on text.
 
#### Example Usage
```markdown
[Link Text](https://thisismylinkurl.com)
```

### Image
 Enables adding picture on text.
 
#### Example Usage
```markdown
![Image Alt](https://thisismyimageurl.com)
```

### Region Formatter
 Enables formatting text.
 
#### Ready to use Formats
* html
* javascript
* css
* csharp
 
#### Example Usage
```markdown
    ```MyFormatterName
    ```
```

## Important Note
 The example use of multiple features is presented in [demo](http://www.bilgisayarafisildayanadam.com/dmuka.MarkDown/).
