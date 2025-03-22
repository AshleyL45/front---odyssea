import React, {FC} from "react";
import Navbar from "../../components/navbars/Navbar";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import BlogDetails from "../../components/ReusableComponents/BlogDetails";
import BlogDetailsReverse from "../../components/ReusableComponents/BlogDetailsReverse"; // Adaptation du chemin d'import si besoin

const MysteryTrip: FC = () => {
    return (
        <>
        <div style={{position: "relative", minHeight: "100vh"}}>
            {/* Image de fond avec filtre pour assombrir et contenu centré via Flexbox */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "80vh",
                    background:
                        'url("https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center/cover',
                    zIndex: 1,
                }}
            >
                {/* Overlay dégradé pour assombrir le bas */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.7) 100%)",
                    }}
                />
                {/* Contenu centré */}
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "#fff",
                        textAlign: "center",
                        zIndex: 2,
                        marginTop: "20px",
                    }}
                >
                    <h1 style={{fontSize: "2.5rem", marginBottom: "1rem"}}>
                        Go on a Mystery Tour
                    </h1>
                    <p style={{fontSize: "1.2rem", marginBottom: "2rem", lineHeight: 1.5}}>
                        Get ready for an unforgettable adventure with no planning!
                    </p>
                    {/* Remplacement du bouton HTML par le composant CustomButton */}
                    <CustomButton style={{color: "#fff", marginTop: "2rem"}}>
                        Je me lance&nbsp;!
                    </CustomButton>
                </div>
            </div>

            {/* Navbar affichée par-dessus l'image */}
            <div style={{position: "relative", zIndex: 2}}>
                <Navbar/>
            </div>
        </div>

        <section className="hero section">
            <BlogDetails
                title="Quand partir en TanSelect your preferences"
                description="La meilleure période pour visiter la Tanzanie dépend de l’expérience recherchée :"
                listItems={[
                    <>De <strong>juin à octobre</strong>, c’est la saison sèche, idéale pour observer la faune sauvage
                        dans le Serengeti ou le cratère du Ngorongoro.</>,
                    <>De <strong>janvier à février</strong>, la grande migration des gnous bat son plein, offrant un
                        spectacle naturel époustouflant.</>,
                    <>De <strong>novembre à mai</strong>, la saison des pluies apporte des paysages verdoyants et moins
                        de touristes, parfait pour une expérience plus exclusive.</>,
                ]}
            />

            <BlogDetailsReverse
                title="Les astuces pour un safari réussi"
                description="Découvrez les conseils pour profiter au mieux de votre safari en Tanzanie."
                listItems={[
                    <>Choisissez une saison favorable pour maximiser vos chances d’observer la faune.</>,
                    <>Préparez-vous physiquement et mentalement pour de longues journées en pleine nature.</>,
                    <>Faites confiance aux guides locaux pour une expérience authentique.</>,
                ]}
            />

            <BlogDetails
                title="Les meilleures activités en Tanzanie"
                description="Au-delà du safari, explorez d’autres activités passionnantes lors de votre voyage."
                listItems={[
                    <>Randonnée sur le mont Kilimandjaro pour les amateurs d’aventure.</>,
                    <>Plongée dans les eaux cristallines de Zanzibar.</>,
                    <>Visite des villages locaux pour découvrir la culture tanzanienne.</>,
                ]}
            />


        </section>
    </>
    );
};

export default MysteryTrip;
