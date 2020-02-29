// Nomes da funções devem começar com letra maiuscula e ser camelCase;
// Botar um nome mais intuitivo possível


// Função que adiciona um 0 ao número passado como parâmetro

function AdicionaZero(n){

    if(n < 10)
        n = "0" + n;
    
    return n;
    
    }

// ============================================================    

// Função que serve de auxiliar para se chamar outra função que realiza determinada operação;

function AuxiliarChamaFuncao(elementos,val,funcao){

    for(var i = 0; i < elementos.length; i++){
    
        funcao(elementos[i],val);
    
    }
    
    }
    
// ===========================================================

// Função que serve de auxiliar para se chamar outra função que realiza determinada operação;

function AuxiliarChamaFuncao2(elementos,indices,val,funcao){

    for(var i = 0; i < indices.length; i++){
    
        funcao(elementos[indices[i]],val);
    
    }
    
}
    
// ===========================================================

// Função que auxilia na criação de eventos para elementos que são vetores

function AuxiliarCriaEventos(elementos,evento,funcao){

    for(var i = 0; i < elementos.length; i++){
    
        elementos[i].addEventListener(evento,funcao); 
    
    }

}

// ========================================================================


function VerificaIndicesInputSelecionados(elementos){

var inColSel = [];

for(var i = 0; i < elementos.length; i++){

if(elementos[i].checked)
    inColSel.push(i); 

}

return inColSel;

}


// ===========================================================================



// Função que muda o textContent de um elemento passado como parâmetro  

function MudaTxtElemento(ele,txt){

    ele.textContent = txt;

}

// ======================================================================

// Função que muda o estado "disabled" do elemento passado como parâmetro 

function MudaDisabledElemento(ele,estado){

ele.disabled = estado;
    
}
    
// ======================================================================

// Função que adiciona ou remove uma classe de um elemento 

function ToggleClasse(ele,cls){

ele.classList.toggle(cls);
    
}
    
// =======================================================================


// Função que muda o value de um elemento

function MudaValueElemento(ele,val){

    ele.value = val;
    
}
    
// ==========================================================================

// Função que muda o atributo de um elemento de acordo com os parâmetros passados 

function MudaAtributoElemento(ele,attr,val){

ele.setAttribute(attr,val);
    
}
    
// ==============================================================================

// Função que muda o type de um elemento do tipo input

function MudaTipoElemento(ele,val){

ele.type = val;

}

// ==============================================================================


// Função que muda o valor checked dos elementos passados como parâmetro 

function MudaCheckedElemento(elemento,val){

elemento.checked = val;

}

// =====================================================================

// Função que gera um  número aleatório

function GeraNumeroAleatorio(val1,val2){

var num = val1 + (Math.round(Math.random() * (val2 - val1)));

return num;

}

// ========================================================================

// Função utilizada para se criar um objeto CampoLocalEstorage

function CampoLocalEstorage(nc,vd,tp){

this.nome = nc;
this.valorDefault = vd;
this.tipo = tp;

}

//================================================================

function CarregaDadosLocalStorage(elementos){

var dados = [];


for(var i = 0; i < elementos.length; i++){
  

if(localStorage.getItem(elementos[i].nome) != null){
  
    
    if(elementos[i].tipo)
        dados.push(JSON.parse(localStorage.getItem(elementos[i].nome)));
    else
        dados.push(localStorage.getItem(elementos[i].nome));

   
}else
    dados.push(elementos[i].valorDefault);    

}  



return dados;

}


// Função que auxilia na habilitação / desabilitação de um elemento 

function AuxiliarHabilitaEDesabilitaElemento(indEleSel,elementos){
   

var indEleDesabilitado; 

if(indEleSel.length  == 1){
      indEleDesabilitado = indEleSel[0];
      MudaDisabledElemento(elementos[indEleDesabilitado],true);

}else{ 
    
    indEleDesabilitado = VerificaEleDesabilitado(elementos);

    if(indEleDesabilitado != -1){
        MudaDisabledElemento(elementos[indEleDesabilitado],false);
    }
}


}

// ==========================================================================

function VerificaEleDesabilitado(elementos){

var indEleDisabled = -1;    

for(var x = 0; x < elementos.length; x++){

  if(elementos[x].disabled){
    indEleDisabled = x;
    break;
    }
}


return indEleDisabled;

}







