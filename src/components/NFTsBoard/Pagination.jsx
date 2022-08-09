import React from "react";
import "./Pagination.css";

export default function Pagination() {
    return (
        <div className="pagination__container">
            {" "}
            <div className="pagination">
                <div className="cross-prev">&#10094;&#10094;</div>
                <div className="prev">&#10094;</div>
                <div className="page-selector">1</div>
                <div className="page-selector">2</div>
                <div className="page-selector">3</div>
                <div className="page-selector--selected">4</div>
                <div className="page-selector">5</div>
                <div className="page-selector">6</div>
                <div className="page-selector">7</div>
                <div className="page-selector">8</div>
                <div className="page-selector">9</div>
                <div className="page-selector">10</div>
                <div className="next">&#10095;</div>
                <div className="cross-next">&#10095;&#10095;</div>
            </div>
        </div>
    );
}
