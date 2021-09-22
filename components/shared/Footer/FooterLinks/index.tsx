import React from "react";
import useSWR from "swr";
import urls from "utils/urls";
import styles from "components/shared/Footer/footer.module.scss";
const FooterLinks: React.FC =  () => {
    const fetcher = (url:string): Promise<unknown> => fetch(url).then(r => r.json());
    const {data, error} = useSWR(`${urls.baseUrl}${urls.api.dropdowns}`, fetcher);
  //https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript 
    const dropdownNames = data && [...new Set(data.payload.map(item => item.data.dropdownCategory))];
    return (
    <div className={styles.row}>
    {data && dropdownNames && (
        dropdownNames.filter((name: string) => name != "Default").map((name: string) => {
            return (
                <div className={`${styles.column} ${styles.links}`}>
                    <h2 className={styles.navButtonMain}>{name}</h2>
                    {data && (
                        data.payload.map(item => {
                            if(item.data.dropdownCategory === name) {
                                return <a key={item.data.title} href={item.data.url} >{item.data.title}</a>
                            }
                            return <></>
                        })
                    )}
                
                </div>
            )
        })
    )}
    </div>
   );
}

export default FooterLinks;
