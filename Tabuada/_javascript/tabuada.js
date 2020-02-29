// Variáveis criadas a partir de Tags HTML

var tagsInputModoColunas = document.querySelectorAll("input[type=radio][name=modoColunas]"); // Armazena dois input do tipo radio que definirão qual será o type do input das tags que armazenam os números; 
var tagsInputTabuadaSel = document.querySelectorAll("input[type=checkbox][name=tabuadaSel]"); // Armazena dois input do tipo checkbox que determinam quais tabuadas estão selecionadas. Multiplicação | Divisão;  
var tagControlaVel = document.querySelector("#controlaVel"); // Armazena o input do tipo range que controla o tempo em que o resultado da operação será exibido;  
var tagsNumeroTab = document.querySelectorAll("input[name=numeroTab]"); // Armazena os inputs com os números que serão utilizados nas operações da tabuada; 
var tagCaixaOperacao = document.querySelector("#caixaOperacao"); // Armazena uma tag Div que exibirá a operação da tabuada;
var txtTagOperacao = document.querySelector("#operacao"); // Recebe a tag que exibirá o texto da operação;  
var txtTagResultado  = document.querySelector("#resultado"); // Recebe a tag que exibirá o texto do resultado da operação;  
var tagbtMostraEscondeResultado = document.querySelector("#btMostraEscondeResultado"); // Recebe uma tag bt que mostrará ou esconderá o resultado da operação;
var tagbtNovaOperacao = document.querySelector("#btNovaOperacao"); // Recebe uma tag bt que chamará a função que realiza outra operação; 

// ==============================================================================

// Variáveis Auxiliares 

var numerosTabuada = [1,2,3,4,5,6,7,8,9,10];
var indInptModoColunasSel; 
var indInptTabuadasSel = [];
var valVel;
var modoUmaColuna;
var indColTagsNumeroTabSel;
var indColsTagsNumeroTabSel = [];
var operacao = [];
var camposLocalStorage = [
                          new CampoLocalEstorage("indInptModoColunasSel",0,0),
                          new CampoLocalEstorage("indInptTabuadasSel",[0],1),
                          new CampoLocalEstorage("valVel",1.5,0),
                          new CampoLocalEstorage("indColTagsNumeroTabSel",0,0),
                          new CampoLocalEstorage("indColsTagsNumeroTabSel",[0],1)
                         ];

var txtTagbtMostraEscondeResultado = ["Mostrar Resultado","Esconder Resultado"];                 
var indTxtTagbtMostraEscondeResultado = 1;




// ===============================================================================

// Eventos

AuxiliarCriaEventos(tagsInputModoColunas,"change",MotorMudaTipoInputNumeroTab);
AuxiliarCriaEventos(tagsInputTabuadaSel,"change",MotorSalvaTabuadasSelecionadas);
AuxiliarCriaEventos(tagsNumeroTab,"change",MotorEventosTagsNumeroTab);

tagControlaVel.addEventListener("change",MotorControlaVelocidade);
tagbtMostraEscondeResultado.addEventListener("click",MotorMostraEscondeResultado); 
tagbtNovaOperacao.addEventListener("click",MotorOperacaoTabuada);


// ================================================================================


Inicio();

// Função Padrão de início de código 

function Inicio(){


[indInptModoColunasSel,indInptTabuadasSel,valVel,indColTagsNumeroTabSel,indColsTagsNumeroTabSel] = CarregaDadosLocalStorage(camposLocalStorage);




MudaCheckedElemento(tagsInputModoColunas[indInptModoColunasSel],true); 
AuxiliarChamaFuncao2(tagsInputTabuadaSel,indInptTabuadasSel,true,MudaCheckedElemento);
MudaValueElemento(tagControlaVel,valVel);
MudaTipoInputNumeroTab();
RealizaOperacaoTabuada();
MudaTxtElemento(tagbtMostraEscondeResultado,txtTagbtMostraEscondeResultado[indTxtTagbtMostraEscondeResultado]);

AuxiliarHabilitaEDesabilitaElemento(indInptTabuadasSel,tagsInputTabuadaSel);
AuxiliarHabilitaEDesabilitaElemento(indColsTagsNumeroTabSel,tagsNumeroTab);

MudaTxtElemento(txtTagOperacao,operacao[0]); 
MotorMostraEscondeResultado(); 


}

// =================================================================================


// Função que muda o tipo de input das tags tagsNumeroTab  

function MotorMudaTipoInputNumeroTab(){

indInptModoColunasSel = parseInt(VerificaIndicesInputSelecionados(tagsInputModoColunas)[0]);
localStorage.setItem("indInptModoColunasSel",indInptModoColunasSel);


  
MudaTipoInputNumeroTab();

}

// ===================================================================

function MudaTipoInputNumeroTab(){

modoUmaColuna = parseInt(tagsInputModoColunas[indInptModoColunasSel].value);     

var tpInput;

if(modoUmaColuna)
    tpInput = "radio";
else
    tpInput = "checkbox";
        
AuxiliarChamaFuncao(tagsNumeroTab,false,MudaCheckedElemento);
AuxiliarChamaFuncao(tagsNumeroTab,tpInput,MudaTipoElemento);
    
if(modoUmaColuna)
    MudaCheckedElemento(tagsNumeroTab[indColTagsNumeroTabSel],true); 
else{
    AuxiliarChamaFuncao2(tagsNumeroTab,indColsTagsNumeroTabSel,true,MudaCheckedElemento);
  
    }

}

// ===================================================================





// Função que salva quais tabuadas estão selecionadas 

function MotorSalvaTabuadasSelecionadas(){

indInptTabuadasSel = VerificaIndicesInputSelecionados(tagsInputTabuadaSel);  
localStorage.setItem("indInptTabuadasSel",JSON.stringify(indInptTabuadasSel));

AuxiliarHabilitaEDesabilitaElemento(indInptTabuadasSel,tagsInputTabuadaSel);


}

// ====================================================================

// Função que verifica e salva quais das tags tagsNumeroTab estão selecionadas e as salvam

function MotorEventosTagsNumeroTab(){

if(modoUmaColuna){
    
    indColTagsNumeroTabSel = VerificaIndicesInputSelecionados(tagsNumeroTab)[0];
    localStorage.setItem("indColTagsNumeroTabSel",indColTagsNumeroTabSel);

}else{
    
    indColsTagsNumeroTabSel = VerificaIndicesInputSelecionados(tagsNumeroTab);  
    localStorage.setItem("indColsTagsNumeroTabSel",JSON.stringify(indColsTagsNumeroTabSel));
    AuxiliarHabilitaEDesabilitaElemento(indColsTagsNumeroTabSel,tagsNumeroTab);
}    




}

// ===========================================================================================


// Função que controla o tempo em que o resultado da operação é mostrado 

function MotorControlaVelocidade(){

valVel =  tagControlaVel.value; 
localStorage.setItem("valVel",valVel);


}

// =====================================================================


function MotorMostraEscondeResultado(){


if(indTxtTagbtMostraEscondeResultado)
    indTxtTagbtMostraEscondeResultado = 0;
else
    indTxtTagbtMostraEscondeResultado++;


MudaTxtElemento(tagbtMostraEscondeResultado,txtTagbtMostraEscondeResultado[indTxtTagbtMostraEscondeResultado]);

if(indTxtTagbtMostraEscondeResultado)
    MudaTxtElemento(txtTagResultado,operacao[indTxtTagbtMostraEscondeResultado]);  
else
    MudaTxtElemento(txtTagResultado,"");  

}







// =====================================================================


function MotorOperacaoTabuada(){

    MudaDisabledElemento(tagbtMostraEscondeResultado,true);
    MudaDisabledElemento(tagbtNovaOperacao,true);
    

    RealizaOperacaoTabuada();

    indTxtTagbtMostraEscondeResultado = 1;
   
   
    MudaTxtElemento(txtTagOperacao,operacao[0]);  
  //   MudaTxtElemento(txtTagResultado,"");  
   
    MotorMostraEscondeResultado(); 


    window.setTimeout(function(){ 
       
   
    MotorMostraEscondeResultado(); 
    MudaDisabledElemento(tagbtMostraEscondeResultado,false);
    MudaDisabledElemento(tagbtNovaOperacao,false);
        
    
    },(valVel * 1000));


}

// =======================================================================

function RealizaOperacaoTabuada(){

var operacaoSel;    


if(VerificaIndicesInputSelecionados(tagsInputTabuadaSel).length == 1)
    operacaoSel = parseInt(tagsInputTabuadaSel[indInptTabuadasSel[0]].value);
else{
    var indiceSorteado = GeraNumeroAleatorio(indInptTabuadasSel[0],indInptTabuadasSel[1]);
    operacaoSel = parseInt(tagsInputTabuadaSel[indiceSorteado].value);
}



if(!(operacaoSel)) 
   OperacaoMultiplicacao();
else
   OperacaoDivisao();



}

// ==================================================================================


function OperacaoMultiplicacao(){

var indiceSorteado = GeraNumeroAleatorio(0,9);    
var fator1 = numerosTabuada[indiceSorteado];
var fator2;

if(modoUmaColuna)
    fator2 = tagsNumeroTab[indColTagsNumeroTabSel].value;
else{
    indiceSorteado = GeraNumeroAleatorio(0,(indColsTagsNumeroTabSel.length - 1));
    fator2 = tagsNumeroTab[indColsTagsNumeroTabSel[indiceSorteado]].value;
}    


operacao = [fator1 + " X " + fator2 + " = ",fator1 * fator2];

}


function OperacaoDivisao(){


    var indiceSorteado;    
    var dividendo; 
    var divisor;
    
    if(modoUmaColuna)
        divisor = tagsNumeroTab[indColTagsNumeroTabSel].value;
    else{
        indiceSorteado = GeraNumeroAleatorio(0,(indColsTagsNumeroTabSel.length - 1));
        divisor = tagsNumeroTab[indColsTagsNumeroTabSel[indiceSorteado]].value;
    }    
    
    indiceSorteado = GeraNumeroAleatorio(0,9);
    dividendo = divisor * numerosTabuada[indiceSorteado];
      
    operacao = [dividendo + " / " + divisor + " = " ,dividendo / divisor];

}



function ExibeOperacao(i){

if(!(i))    
    MudaTxtElemento(txtTagOperacao,operacao[i]);  
else
    MudaTxtElemento(txtTagResultado,operacao[i]);  


}