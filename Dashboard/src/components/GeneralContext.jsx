import React, { useState } from "react";

import BuyActionWindow from "./ActionWindow";

const GeneralContext = React.createContext({
  openOrderWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedMode, setSelectedMode] = useState("BUY");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOpenOrderWindow = (uid, mode = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedMode(mode);
  };

  const triggerRefresh = () => setRefreshKey((k) => k + 1);

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openOrderWindow: handleOpenOrderWindow,
        closeBuyWindow: handleCloseBuyWindow,
        refreshKey,
        triggerRefresh,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={selectedMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;