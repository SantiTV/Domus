import PropTypes from "prop-types";
import SidebarLayout from "../components/SidebarLayout";

function UserProfileView(props) {
    return (
        <div>
            <SidebarLayout user={props.user} />
        </div>
    );
}

UserProfileView.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string]).isRequired,

    }).isRequired,
    userHistory: PropTypes.arrayOf(PropTypes.object),
};

export default UserProfileView;
