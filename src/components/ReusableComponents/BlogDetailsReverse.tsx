import {FC} from 'react';

const BlogDetailsReverse: FC<{}> = ({}) => {
    return (

        <div style={{margin: "200px 0"}}>

            <section className="component blog-details-reverse">

                <div className="text-blog-details-reverse">
                    <h3 style={{fontSize: "28px", marginBottom: "30px"}}>Quand partir en Tanzanie ?</h3>
                    <p style={{margin: "30px 0"}}>
                        La meilleure période pour visiter la Tanzanie dépend de l’expérience recherchée :
                    </p>
                    <ul className="blog-details-list">
                        <li>De <strong>juin à octobre</strong>, c’est la saison sèche, idéale pour observer la faune
                            sauvage dans le
                            Serengeti ou le cratère du Ngorongoro.
                        </li>
                        <li>
                            De <strong>janvier à février</strong>, la grande migration des gnous bat son plein, offrant
                            un spectacle
                            naturel époustouflant.
                        </li>
                        <li>
                            De <strong>novembre à mai</strong>, la saison des pluies apporte des paysages verdoyants et
                            moins de
                            touristes, parfait pour une expérience plus exclusive.
                        </li>
                    </ul>
                </div>

                <div className="blog-details-reverse-photo"></div>

            </section>

        </div>
    );
};

export default BlogDetailsReverse;
