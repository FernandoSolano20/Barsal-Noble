'use strict';

let registrarTarjeta = async (tarjeta ) => {
    let response = await axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrarTarjeta',
        responseType: 'json',
        data: tarjeta
    });
    return await response.data;
};

let obtenerTarjetas  = async () => {
    try{ 
        //Fetch data from an url endpoint:
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarTarjetas',  
            responseType: 'json'   
        });
        const result = await response;
        return result.data.listaTarjetas;
    }catch (error){
        console.log(error);
    } 
};

let obtenerTarjetasUsuario  = async (id) => {
    try{ 
        //Fetch data from an url endpoint:
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listarTarjetasPorId/'+id,  
            responseType: 'json'   
        });
        const result = await response;
        return result.data.listaTarjetas;
    }catch (error){
        console.log(error);
    } 
};

let modificar =  (pid, pnombre1, pnumTarjeta, ptipoTarjeta, pexpiracionMM, pexpiracionYY, pcvv) => {
    axios({ 
        //Fetch data from an url endpoint:
           method: 'post',
            url: 'http://localhost:4000/api/modificarTarjeta/' + id,  
            responseType: 'json'   ,
            data: {
                _id: pid,
                nombre1: pnombre1,
                tipoTarjeta: ptipoTarjeta,
                numTarjeta: pnumTarjeta,            
                expiracionMM: pexpiracionMM,
                expiracionYY: pexpiracionYY,
                cvv: pcvv
            }
        });
    
};
