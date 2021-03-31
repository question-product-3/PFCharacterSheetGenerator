const createUdonariumXML =() =>{
  let strmod=getModifier(characterData.Str);
  let dexmod=getModifier(characterData.Dex);
  let conmod=getModifier(characterData.Con);
  let intmod=getModifier(characterData.Int);
  let wismod=getModifier(characterData.Wis);
  let chamod=getModifier(characterData.Cha);


  var xmlText =  ['<?xml version="1.0" encoding="UTF-8"?>'];
  xmlText.push('<character location.name="table" location.x="550" location.y="275" posZ="0" rotate="0" roll="0">') ;
  xmlText.push('<data name="character">');
  xmlText.push('<data name="image">');
  // SHA256でイメージ変換が必要
  xmlText.push('<data type="image" name="imageIdentifier">2c5489f61dd68a27893f4f252907ee80021bb428c1721cffb916b4e479c89112</data>');
  xmlText.push('</data>');
  xmlText.push('<data name="common">');
  xmlText.push('<data name="name">'+ characterData.name +'</data>');
  xmlText.push('<data name="size">'+ characterData.size +'</data>');
  xmlText.push('</data>');
  xmlText.push('<data name="detail">');
  xmlText.push('<data name="防御データ">');
  var AC = 10 + Object.values(characterData.AC).reduce((acum,x)=>{return acum + Number(x.bonus);},0); //  AC計算 各ﾎﾞｰﾅｽ合算
  AC += (dexmod < characterData.AC.armor.MaximumDexBonus)?dexmod : characterData.AC.armor.MaximumDexBonus ; //敏修正値計算
  xmlText.push('<data name="AC">'+ AC+ '</data>');
  xmlText.push('<data name="HP" type="numberResource" currentValue="' + characterData.HP+'">'+ characterData.HP+'</data>');
  //各種ｾｰｳﾞ産出
  var fort = Object.values(characterData.saving.Fort).reduce((acum,x)=>{return acum + Number(x);},0);
  var Ref = Object.values(characterData.saving.Ref).reduce((acum,x)=>{return acum + Number(x);},0);
  var Will = Object.values(characterData.saving.Will).reduce((acum,x)=>{return acum + Number(x);},0);
  xmlText.push('<data name="頑健ｾｰｳﾞ">+' + fort +'</data>');
  xmlText.push('<data name="反応ｾｰｳﾞ">+' + Ref +'</data>');
  xmlText.push('<data name="意思ｾｰｳﾞ">+' + Will +'</data>');

  xmlText.push('</data>');
  xmlText.push('</data>');
  xmlText.push('</data>');
  xmlText.push('</character>');

    var downLoadLink = document.createElement("a");
    downLoadLink.download = "a.xml";
    downLoadLink.href = URL.createObjectURL(new Blob(xmlText,{type:"application/xml"}));
    downLoadLink.click();
  };

function getModifier(value){
  return Math.floor((value-10)/2)
}

window.onload=()=> {
  let button = document.getElementById("createUdonariumXML");
  button.addEventListener("click",createUdonariumXML);
  console.log("evented");
}
