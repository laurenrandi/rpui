import {useEffect} from 'react';

export default function useUnsavedChangesWarning(
  condition: boolean
){
  useEffect(() => {
    const beforeunloadHandler  = (e: BeforeUnloadEvent) =>  {
      if(condition){
        e.preventDefault();
        e.returnValue = true;
      }
    }
    window.addEventListener("beforeunload", beforeunloadHandler);
  }, [condition]);
}
