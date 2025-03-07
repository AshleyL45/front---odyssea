import {FC} from 'react';

const BlogItemBlog: FC<{}> = ({}) => {
    return (

        <div style={{margin: "200px 0"}}>

            <div className="blog-line"></div>

            <section className="component blog-item-blog">

                <div className="text-item-blog">
                    <h3 style={{fontSize: "28px", marginBottom: "30px"}}>
                        Tanzanie : L'Évasion Ultime Entre Savane et Plages Paradisiaques
                    </h3>
                    <p style={{marginBottom: 50}}>
                        La Tanzanie est une terre de contrastes, offrant des paysages spectaculaires et une faune
                        exceptionnelle. Connue pour ses grands safaris de luxe, ses plages paradisiaques et .....
                    </p>
                    <a href="#" style={{margin: "30px 0", textDecoration: "underline"}}>Lire la suite</a>
                </div>

                <div className="blog-item-blog-photo"></div>

            </section>

            <div className="travel-line" style={{width: "40%", height: "3px", backgroundColor: "#745E4D", borderRadius: 4, margin: "20px auto"}}></div>

        </div>
    );
};

export default BlogItemBlog;
