import React from "react";

import ProfessionalService from "../components/ProfessionalService";

function MainView(props) {
    

    return (
        <div>
            <ProfessionalService user={props.user} />
        </div>
    );
}

export default MainView;