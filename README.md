# dmuka.MarkDown (JavaScript Library for Web Sites)
Demo : http://www.bilgisayarafisildayanadam.com/dmuka.MarkDown/

 Bu kütüphaneyi kullanarak projelerinizde MD formatında yazıları destekleyebilir, kullanıcılarınıza çok daha fazla fonksiyonları olan notlar tutmalarını sağlayabilirsiniz.
 
 **Hız** olarak çok başarılı olan "_dmuka.MarkDown_" projesinin kullanımı oldukça basittir.
 
#### Örnek Kullanım
```javascript
var html = dmuka.MarkDown.Convert(<md-text>);
```

 Birçok _MD_ özelliğini desteklemektedir.
 
## Desteklenen Özellikler

### Bold
 Metinlerinizi kalın olarak yazmanızı sağlar.
 
#### Örnek Kullanım
```markdown
**text**
__text__
```

### Italic
 Metinlerinizi italic olarak yazmanızı sağlar.
 
#### Örnek Kullanım
```markdown
*text*
_text_
```

### Header
 Metinlerinizi başlık olarak yazmanızı sağlar.
 
#### Örnek Kullanım
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Strikethrough
 Metinlerinizi üstü çizili olarak yazmanızı sağlar.
 
#### Örnek Kullanım
```markdown
~~text~~
```

### Unordered List
 Metinlerinizde maddelendirme kullanmanıza olanak sağlar.
 
#### Örnek Kullanım
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
 Metinlerinizde sayı ile maddelendirme kullanmanıza olanak sağlar.
 
#### Örnek Kullanım
```markdown
1. List1 Item 1
2. List1 Item 2
3. List1 Item 3

1. List2 Item 1
1. List2 Item 2
1. List2 Item 3
```

### Checkbox
 Metinlerinizde işaretleme kutusunu kullanma olanağı sağlar.
 
#### Örnek Kullanım
```markdown
 - [ ] Unchecked Item
 - [x] Checked Item
```

### Line
 Satır çizmenizi sağlar.
 
#### Örnek Kullanım
```markdown
---
```

### Blockquote
 Metinlerinizde "_Blockquote_" özelliğini kullanmanıza olanak sağlar.
 
#### Örnek Kullanım
```markdown
>  Hello World
>  This is so fast!
```

### Code
 Metinlerinizde "_Code_" özelliğini kullanmanıza olanak sağlar.
 
#### Örnek Kullanım
```markdown
    This is code line!
```

### Table
 Metinlerinizde "_Table_" özelliğini kullanmanıza olanak sağlar.
 
#### Örnek Kullanım
```markdown
|   Column1   |   Column2   |   Column3   |   Column4   |
|:--|:--:|--:|--|
|   Row 1 Text 1   |   Row 1 Text 2   |   Row 1 Text 3   |   Row 1 Text 4   |
|   Row 2 Text 1   |   Row 2 Text 2   |   Row 2 Text 3   |   Row 2 Text 4   |
|   Unneccessary Text For Show Text Align   |   Unneccessary Text For Show Text Align   |   Unneccessary Text For Show Text Align   |   Unneccessary Text For Show Text Align   |
```

### Link
 Metinlerinizde link vermenize olanak sağlar.
 
#### Örnek Kullanım
```markdown
[Link Text](https://thisismylinkurl.com)
```

### Image
 Metinlerinize resim eklemenize olanak sağlar.
 
#### Örnek Kullanım
```markdown
![Image Alt](https://thisismyimageurl.com)
```

### Region Formatter
 Metinlerinizi formatlandırmanızı sağlar.
 
#### Hazır Formatlar
* html
* javascript
* css
* csharp
 
#### Örnek Kullanım
```markdown
    ```MyFormatterName
    ```
```

## Önemli Not
 Aynı anda birden fazla özelliğin kullanım örnekleri [demo](http://www.bilgisayarafisildayanadam.com/dmuka.MarkDown/) içerisinde yer almaktadır.
