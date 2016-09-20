# formatjs
a tiny number format 

----
## USEAGE

commonJS
```
  var format = reuqire('format');
```

 AMD
```
  define(['format'], function (f) {
  });
```
  
  Browser
```
<script src="format.js"></script>
<script>
    format.parse('1,200');
</script>
```


----
## API

* format.VERSION  version number

* format.settings[Object] global settings
    - unit[Number]  default  is 1
    - symbol[String] default is ''
    - precision[Number] default is 2
    - separator[String] thousands separator, default is ',' 
    - format[String] %v = value %s = symber
    - decimal[String] decimal separator, default is '.'

* format.parse(value, decimal)
    - value[Number | String | Array]
    - decimal[String]
    ```
      format.parse('1,000')
      //1000
      format.parse('1,000%', '%')
      //1000
    ```
* format.format(value, precision, format, symbol, unit, separator, decimal) ||  format.parse(value, settings)
    - value[Number | Array]
    - unit[Number] 
    - symbol[String] 
    - precision[Number]
    - separator[String] 
    - format[String]
    - decimal[String] 
    ```
      format.format(10000000) // "10,000,000.00"
      format.format(10000000, 0) //"10,000,000"
      format.format(10000000, {precision:3, unit: 100, symbol: '%'}) //"100,000.000%"
    ```

* format.toFixed(value, precision)
  ```
    format.toFixed(2132.54753, 2) //2132.55
    //compare to NumberObject.toFixed(num)
    2132.54753.toFixed(2) //2132.54
  ```

