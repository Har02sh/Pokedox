function useDebounce(func, delay=500){
    let timerID;
    return function(...args){
        clearTimeout(timerID);
        timerID = setTimeout(()=>{
            func(...args);
        },delay)
    }
}

export default useDebounce;