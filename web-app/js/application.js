if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}


Ext.override(Ext.data.Store,{
    listeners:{
        exception: function (dataproxy, tipo, action, options, response,  arg ) {
            if(response.status==401){
                window.location = loginurl;
            }else{
                if(response.status==0){
                    Ext.Msg.show({
                        title:'Error'
                        , icon:Ext.MessageBox.ERROR
                        , msg:'Error de comunicación, verifique su conexión a la web'
                        , buttons:Ext.MessageBox.OK
                        , fn: function(btn){
                        }
                    });
                }else{
                    Ext.Msg.show({
                        title:'Error'
                        , icon:Ext.MessageBox.ERROR
                        , msg:'Error general, intente más tarde y verifique su conexión a la web'
                        , buttons:Ext.MessageBox.OK
                        , fn: function(btn){
                        }
                    });
                }
            }
        }
    }
});


