<!doctype html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Grails"/></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${resource(dir: 'images', file: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${resource(dir: 'images', file: 'apple-touch-icon-retina.png')}">
		<!--link rel="stylesheet" href="${resource(dir: 'css', file: 'main.css')}" type="text/css"-->
        <!--link rel="stylesheet" href="${resource(dir: 'css', file: 'mobile.css')}" type="text/css"-->
        <link rel="stylesheet" href="${resource(dir:'css/extjs',file:'ext-theme-neptune-all.css')}">
        <script type="text/javascript" src="${resource(dir:'js/extjs',file:'ext-all-rtl-debug-w-comments.js')}"></script>
		<g:layoutHead/>
		<r:layoutResources />
        <script type="text/javascript">
            Ext.onReady(function(){
                Ext.widget({
                    xtype:'panel',
                    renderTo:'grailsLogo',
                    //title: 'Mix and match icon sizes to create a huge unusable toolbar',
                    items: [
                        {
                            xtype:'button',
                            text:'Ordenes',
                            menu:[{
                                    text:'Alta Orden de Compra',
                                    listeners:{
                                        click:function(menu, item, e, eOpts){
                                            window.location = '<%out << createLink(controller:'orden',action:'create')%>'
                                        }
                                    }
                                },{
                                    text:'Listado Orden de Compra'
                                },{
                                    text:'Alta de Orden de Venta'
                                },{
                                    text:'Listado de Orden de Venta'
                                }

                            ]
                        },{
                            xtype:'button',
                            text:'Configuración',
                            menu:[{
                                text:'Ganado',
                                listeners:{
                                    click:function(menu, item, e, eOpts){
                                        window.location = '<%out << createLink(controller:'orden',action:'create')%>'
                                    }
                                }
                                },{
                                    text:'Clasificación de Ganado'
                                }
                            ]
                        }


                    ]
                });

            });
        </script>
	</head>
	<body style="margin: 2em 1em 1.25em 13em">
		<div id="grailsLogo" role="banner"><a href="http://www.srt.org.ar"><img src="${resource(dir: 'images', file: 'headersrt.png')}" alt="Grails"/></a></div>
        <g:layoutBody/>
		<div class="footer" role="contentinfo"></div>
		<div id="spinner" class="spinner" style="display:none;"><g:message code="spinner.alt" default="Loading&hellip;"/>
        </div>
		<g:javascript library="application"/>
		<r:layoutResources />
	</body>
</html>