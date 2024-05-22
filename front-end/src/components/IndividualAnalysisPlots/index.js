import React from 'react'

function index(props) {
  const { selectedRow, renderPlotButtons, selectedPlot,item,Plot } = props.location.state;
  return (
    <div>
      {selectedRow === item[0] && (
        <div>
          {renderPlotButtons(item[0])}
          {selectedPlot && <Plot data={selectedPlot.data} layout={selectedPlot.layout} />}
        </div>
      )};
                               
    </div>
  )
}

export default index
