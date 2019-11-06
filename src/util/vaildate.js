//判断是否为空
export const isDataValid=(data)=>{
    if(data != null&&data !="" && data !==undefined&& data !==null && data !="undefined"){
      return true;
    }
    else{
        return false;
    }
}