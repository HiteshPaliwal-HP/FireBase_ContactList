import { useState } from "react";

const useDisclose = () => {

    const[isopen, setopen] = useState(false);

  const onOpen  =()=>{
    setopen(true);
  }
  const onClose=()=>{
    setopen(false);
  }
  return {onClose, onOpen, isopen };
};

export default useDisclose
