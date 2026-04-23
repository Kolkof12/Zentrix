import React, { useEffect, useRef } from 'react';

const TradingChart = ({ symbol = "BINANCE:BTCUSDT" }) => {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => {
            new window.TradingView.widget({
                container_id: container.current.id,
                symbol: symbol,
                interval: "D",
                theme: "dark",
                style: "1",
                locale: "en",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                hide_side_toolbar: false,
                allow_symbol_change: true,
                autosize: true,
            });
        };
        container.current.appendChild(script);
    }, [symbol]);

    return <div id="tradingview_chart" ref={container} className="h-[500px] w-full" />;
};

export default TradingChart;
