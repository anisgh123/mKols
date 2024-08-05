
import Card from "../../Components/Card"
import CardTitle from "../../Components/CardTitle"
import Logo from "../../Components/Logo"
import Title from "../../Components/Title"

import business from "../../Assets/Images/Icons/buseness.png"
import profile from "../../Assets/Images/Icons/profile.png"


import "./index.css"

import CardInfos from "../../Components/CardInfos"

export default function ActorSpace() {
  return (
    <div className="actor-space">
        <header className="App-header">
            <Logo />
            <button onClick={() => window.location.href = "/login"} className="login">
                    Login
             </button>
        </header>
        <Title title="Create your free account" subtitle="Free for ever. No credit card required "/>
        <div className="cards-container">
            <Card>
                <CardTitle logo={business} title="Business" subtitle="For brands, agencies, and e-commerce stores."/>
                <button  onClick={() => window.location.href = "./signup-business"} className="Signup-busuiness">
                    Sign Up Free
             </button>
                <hr/>
                <CardInfos title="Every feature your team needs" string1="influencer discovery & recruiting" string2="Comprehensive influencer analytics" string3="Media Planning tool"/>
            </Card>

            <Card>
                <CardTitle logo={profile} title="Creator" subtitle="For influencers to connect and grow"/>
                <button  onClick={() => window.location.href = "/signup-creator"} className="Signup-creator">
                    Sign Up Free
                    </button>
                <hr/>
                <CardInfos title="Tools to evaluate your creator game" string1="In-depth creator data insight" string2="Auto-updated media kit" string3="personalized recommandations for brands to work with"/>
            </Card>
        </div>
        
    </div>
  )
}