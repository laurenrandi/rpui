import {useEffect} from 'react';

export default function UseUnsavedChangesWarning(
  condition: boolean
){
  useEffect(() => {
    const beforeunloadHandler  = (e: BeforeUnloadEvent) =>  { //beforeunloadevent when the current window is about to be unloaded
      if(condition){
        e.preventDefault(); //prevents reload and refresh
        e.returnValue = true; //allows the default action to occur
      }
    }
    window.addEventListener("beforeunload", beforeunloadHandler);
  }, [condition]);
  

}
