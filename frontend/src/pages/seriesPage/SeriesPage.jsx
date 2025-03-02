import { useEffect } from "react";
import { useSeriesStore } from "../../store/useSeriesStore"
import { useParams } from "react-router-dom"
import BookSeries from "../../components/bookSeries/BookSeries";
import styles from "./seriesPage.module.css"

export default function SeriesPage() {
    const { id } = useParams();
    const { getSeries, series, isSeriesLoading, seriesError } = useSeriesStore();

       useEffect(() => {
                getSeries(id);
        }, [getSeries, id]);
       
      console.log(series)


    if (seriesError) {
      return <div>Error: {seriesError}</div>;
    }
  
    if (isSeriesLoading) {
      return <div>Loading...</div>;
    }


    return (
        <div className={styles.pageContainer}>
          <div className={styles.deleteBtnContainer}>
            Delete
          </div>
            <div>
            <BookSeries series={series} />
            </div>
            
        </div>
    )
}