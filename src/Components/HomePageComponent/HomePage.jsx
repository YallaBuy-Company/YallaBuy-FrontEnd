import React from "react";
import { Itemscontainer } from '../Itemscontainer'
import { Cardgrid } from '../Cardgrid';


export const HomePage = ()=> {

    function createData(date,team1,team2,location,price) {
        try {
            const dateObject = new Date(date);
            const formattedDate = dateObject.toLocaleDateString(/*'en-US'*/'de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
            return { formattedDate, team1, team2, location, price };
          } catch (error) {
            console.error("Invalid date format:", date);
            return { formattedDate: "Invalid Date", team1, team2, location, price };
          }
    }
    
    const rows = [
      createData("12/20/2023","team1","team2","location",95.40),
      createData("12/21/2023","team1","team2","location",99.40),
      createData("12/22/2023","team1","team2","location",98.40),
      createData("12/23/2023","team1","team2","location",97.40),
      createData("12/24/2023","team1","team2","location",93.40),
      createData("12/25/2023","team1","team2","location",90.40),
      createData("12/26/2023","team1","team2","location",91.40),
      createData("12/26/2023","team1","team2","location",92.40),
      createData("12/28/2023","team1","team2","location",99.40)
    ];

    return (
        <>
          {/*<Itemscontainer rows={rows}/>*/}
          <Cardgrid/>
        </>
    );
}
