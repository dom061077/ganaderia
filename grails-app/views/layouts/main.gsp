<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Sistema de Ganado</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${resource(dir: 'images', file: 'srt.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${resource(dir: 'images', file: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${resource(dir: 'images', file: 'apple-touch-icon-retina.png')}">
		<link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css">
        <!--link rel="stylesheet" href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css"-->
        <link rel="stylesheet" href="${resource(dir:'css/extjs',file: 'ext-theme-neptune-all.css')}">
        <script type="text/javascript" src="${resource(dir:'js/extjs',file: 'ext-all-rtl-debug-w.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/extjs',file:'ext-lang-es.js')}"></script>
        <script type="text/javascript" src="${resource(dir:'js/ConstraintsDefinitions.js')}"></script>


		<g:layoutHead/>
		<r:layoutResources />
        <script type="text/javascript">
            Ext.onReady(function(){
                Ext.widget({
                    xtype:'panel',
                    border:false,
                    margin: '0 0 30 0',
                    renderTo:'grailsLogo',
                    //title: 'Mix and match icon sizes to create a huge unusable toolbar',
                    items: [
                        {
                            xtype:'button',
                            text:'Ordenes',
                            menu:[{
                                    text:'Alta Orden de Venta',
                                    listeners:{
                                        click:function(menu, item, e, eOpts){
                                            window.location = '<%out << createLink(controller:'orden',action:'create')%>'
                                        }
                                    }
                                },{
                                    text:'Listado Orden de Venta',
                                    listeners:{
                                        click:function(men,item,e, eOpts){
                                            window.location = '<%out << createLink(controller:'orden', action:'list')%>';
                                        }
                                    }
                                }

                            ]
                        },{
                            xtype:'button',
                            text:'Configuración',
                            menu:[
                            {
                                text:'Condiciones de Operación',
                                listeners:{
                                    click:function(menu, item, e, eOpts){
                                        window.location = '<%out << createLink(controller:'condicionOperacion',action:'list')%>'
                                    }
                                }
                            },{
                                    text:'Numeradores de Comprobantes',
                                    listeners:{
                                        click: function(menu,item,e,eOpts){
                                            window.location = '<%out << createLink(controller:'numerador',action:'list')%>';
                                        }
                                    }
                                }
                            ]
                        },{
                            xtype:'button',
                            text:'Datos de Ganado',
                            menu:[
                                {
                                    text:'Categorias',
                                    listeners:{
                                        click:function(menu,item,e,eOpts){
                                            window.location = '<%out << createLink(controller:'categoria',action:'list')%>';
                                        }
                                    }
                                },{
                                    text:'Especies',
                                    listeners:{
                                        click:function(meu,item,e,eOpts){
                                            window.location = '<%out << createLink(controller:'especie',action:'list')%>';
                                        }
                                    }
                                },{
                                    text:'Razas',
                                    listeners:{
                                        click:function(meu,item,e,eOpts){
                                            window.location = '<%out << createLink(controller:'raza',action:'list')%>';
                                        }
                                    }

                                }
                            ]
                        }


                    ]
                });

            });
        </script>
	</head>
	<body style="margin: 2em 13em 1.25em 13em">
		<div id="grailsLogo" role="banner"><a href="${createLink(action:'index')}"><img src="${resource(dir:"/images",file:"headersrt.png")}" alt="Logo"/></a></div>
        <g:layoutBody/>
		<div class="footer" role="contentinfo"></div>
		<div id="spinner" class="spinner" style="display:none;"><g:message code="spinner.alt" default="Loading&hellip;"/>
        </div>
        <script type="text/javascript">
            var loginurl = '${createLink(uri:'/login')}';
        </script>    
		<g:javascript library="application"/>
		<r:layoutResources />
	</body>
</html>