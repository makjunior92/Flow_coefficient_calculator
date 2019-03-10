
(function(){ 
        
        $("#flow").change(function(){
            
            $('.flow-rate').hide();
            $('.cv').show();
            $('.cv-flow-unit').show();
            $('#cv-liquid-flow-unit').hide();
        
});

        $('#cv').change(function(){
        
            $('.cv').hide();
            $('.cv-flow-unit').hide();
            $('.flow-rate').show();
    
});

        $('#liquid').change(function(){
        
            $('.liquid-unit').show();
            $('.gas-unit').hide();
            $('#liquid-system-medium').show();
            $('#gas-system-medium').hide();
            
            $('#specific-gravity').val($('#liquid-system-medium').find('option:selected').val());
});


        $('#gas').change(function(){
        
            $('.gas-unit').show();
            $('.liquid-unit').hide();
            $('#gas-system-medium').show();
            $('#liquid-system-medium').hide();
            
            $('#specific-gravity').val($('#gas-system-medium').find('option:selected').val());
});
    
    
    $('select[name="system-medium"]').change(function(){
        
        $('#specific-gravity').val($(this).find('option:selected').val());
        
    });

 
    
})();


function calculate(){
    
    
    
    
 
        
       
        
        
  
    
    
    
    
    
   
    //initializing variables 
    
    var p1, p2;
    
    
    //pressure
     $p1_unit = $('#p1-unit').find('option:selected').val();
     $p2_unit = $('#p2-unit').find('option:selected').val();
    
  
    
    
    //converting pressure 1 units
    
    
    if( $p1_unit == "psia"){p1=parseFloat($('#p1').val());}
    else if($p1_unit == "kpa"){p1=parseFloat($('#p1').val())/6.89476;}
    else if($p1_unit == "mpa"){p1=parseFloat($('#p1').val())/0.0068;}
    else if($p1_unit == "bar"){p1=parseFloat($('#p1').val())/0.06894;}
    else{p1=parseFloat($('#p1').val())+14.7;}
 
     console.log("p1: " +  p1);
    
    
      //converting pressure 2 units
    
    if( $p2_unit == "psia"){p2=parseFloat($('#p2').val());}
    else if($p2_unit == "kpa"){p2=parseFloat($('#p2').val())/6.89476;}
    else if($p2_unit == "mpa"){p2=parseFloat($('#p2').val())/0.0068;}
    else if($p2_unit == "bar"){p2=parseFloat($('#p2').val())/0.06894;}
    else{p2=parseFloat($('#p2').val())+14.7;}
    
   
    
    $flow_rate = parseFloat($('#flow-rate').val());
   
    $liquid_flow_rate_unit = parseFloat($("#liquid-flow-rate-unit").find('option:selected').val());
    
    
    $gas_flow_rate_unit = parseFloat($("#gas-flow-rate-unit").find('option:selected').val());
    
    if($('#cv').is(':checked')){$('#cv-input').prop('required',false);}
     
    
 
    
    
    
    
    
//    
//   CV
//    
    
    
    
    
    $cv = parseFloat($('#cv-input').val());
     
    $cv_gas_flow_unit = parseFloat($('#cv-gas-flow-unit').find('option:selected').val());
    
    $cv_liquid_flow_unit = parseFloat($('#cv-liquid-flow-unit').find('option:selected').val());
    
    if($('#flow').is(':checked')){$('#flow-rate').prop('required',false);}
    
    
    
    
    
    
    
    
    
    
    
    
// temperature conversion
    
    
    
    $temp = parseFloat($('#temp').val());
    
    $temp_unit = $('#temp-unit').find('option:selected').val();
    
    
    
    switch( $temp_unit){
        case "f" : 
            $temp = $temp + 459.67 ;
            break;
        
        
        case "c" :
             $temp = ($temp * 1.8) + 32 + 460;
            break;
        
        
        case "k" :
            $temp = (($temp - 273) * 1.8) + 32 + 460;
            
    }
    
    console.log("temperature in ranking of " + $temp_unit + " is:" + $temp);
    
    //gravity
    $g = $('#specific-gravity').val();
    
    
    
    
    
    
    
    
   
    
    
    
    
    
    
    
    
    
    //main calculation starts
    
    
 
        console.log("liquid flow rate unit: " + $liquid_flow_rate_unit);
  
    
    
     var cv_for_liquid;
    var cv_for_gas;
    var flow_for_liquid;
    var flow_for_gas;
    
    if(p1>p2){
        
        
        
        // Calculation for CV
        
         if($('#cv').is(':checked')){
        
        if($('#liquid').is(':checked')){
            
           
                 cv_for_liquid = (($flow_rate / $liquid_flow_rate_unit) * Math.sqrt($g/(p1-p2))).toFixed(2);
            $('.result').show();
            $('#result').text("CV = " + cv_for_liquid);
            
            
       
            
        }
             
             
             
             if($('#gas').is(':checked')){
            
                 
                 if( p2 > (p1 /2) ){ 
                     
                     
                     var x = (p1-p2)/p1;
                     cv_for_gas = (($flow_rate /$gas_flow_rate_unit)/(22.67 * p1 * (1-(2 * x/3)) * Math.sqrt(x/($g * $temp)))).toFixed(2);
                     
                      $('.result').show();
                      $('#result').text("CV = " + cv_for_gas);
                     
                     
                }
                 else{
                     
                     
                     cv_for_gas = (($flow_rate /$gas_flow_rate_unit)  / (22.67 * p1 * 0.471 * Math.sqrt(1/($g * $temp)))).toFixed(2);
                     
                     
               
                      
                   
                     
                     $('.result').show();
                     $('#result').text("CV = " + cv_for_gas);
                     
                     
                    }
                 

            }
   
         }
        
   
    
    
        
        
         // Calculation for Flow rate
    
    
    
        
        
        if($('#flow').is(':checked')){
        
        if($('#liquid').is(':checked')){
            
           
             flow_for_liquid =  ($cv * $cv_liquid_flow_unit) * Math.sqrt((p1-p2)/$g);
            
            //dblQ = dblCv * Math.sqrt((dblPress1 - dblPress2) / dblSG);
            
            
            $('.result').show();
            $('#result').text("Flow = " +  (flow_for_liquid).toFixed(2));
            
            
       
            
        }
             
             
             
             if($('#gas').is(':checked')){
            
                 
                 if( p2 > (p1/2) ){ 
                     
                     
                     var x = (p1-p2)/p1;
                   
                     
                     
                   flow_for_gas = ($cv * $cv_gas_flow_unit) * 22.67 * p1 * (1 - (2 * x / 3)) * Math.sqrt(x / ($g * $temp));
                     
                   
                     
                     
                     
                      $('.result').show();
                      $('#result').text("Flow = " + flow_for_gas.toFixed(2));
                     
                     
                }
                 else{
                     
                     
                    
                     
                     flow_for_gas = (22.67 * p1 * 0.471 * Math.sqrt(1/($g * $temp))) * ($cv * $cv_gas_flow_unit);
                   
                     
                     
               
                      
                   
                     
                     $('.result').show();
                     $('#result').text("Flow = " + flow_for_gas.toFixed(2));
                     
                     
                    }
                 

            }
   
         }
        
        
        
    
    
    
    
    }
    
   
       
   
   
    
    else{
                alert("Inlet pressure must be greater than Outlet pressure");
                   
                      return;
            }
        
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //console.log("cv: " +$cv+"cv gas flow unit : "+$cv_gas_flow_unit +"cv_liquid_flow_unit: "+$cv_liquid_flow_unit+ " flow_rate :" +$flow_rate +  "liquid_flow_rate_unit:" + $liquid_flow_rate_unit+ "gas_flow_rate_unit:"+$gas_flow_rate_unit + $temp + $g);

    
}