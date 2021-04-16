module.exports={
    configureWebpack:{    /*配置config的webpack*/
        resolve:{
            // extensions:[] 配置后缀名 .vue .js .css
            // 内部配置过 '@' : 'src'
            alias: {
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'view':'@/view'

            }
        }
      
    }
    
}/*导出配置，并且这里写的代码可以和node_modeules里面的合并*/