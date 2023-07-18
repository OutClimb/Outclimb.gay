package api

import (
	"net/http"

	"github.com/NicholeMattera/Outclimb.gay/internal/model"
)

func SetupRouter(mux *http.ServeMux) {
	// Static Files
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Homepage
	mux.Handle("/", http.RedirectHandler("https://linktr.ee/OutClimbMN", http.StatusTemporaryRedirect))

	// Events
	mux.Handle("/events/bouldering-meetup-minneapolis-bouldering-project/", EventHandler())
	mux.Handle("/events/outdoor-climbing/", LatestEventHandler(model.OutdoorClimbing))
	mux.Handle("/events/outdoor-skills-sharing/", LatestEventHandler(model.SkillsShare))
	mux.Handle("/events/20230506-outdoor-climbing-taylor-falls/", EventHandler())
	mux.Handle("/events/20230527-outdoor-climbing-taylor-falls/", http.RedirectHandler("https://outclimb.gay/events/20230527-outdoor-climbing-saint-croix-falls", http.StatusPermanentRedirect))
	mux.Handle("/events/20230527-outdoor-climbing-saint-croix-falls/", EventHandler())
	mux.Handle("/events/20230716-outdoor-skills-sharing-sugar-loaf-bluff/", EventHandler())
	mux.Handle("/events/20230716-outdoor-climbing-sugar-loaf-bluff/ ", http.RedirectHandler("https://outclimb.gay/events/20230716-outdoor-skills-sharing-sugar-loaf-bluff/", http.StatusTemporaryRedirect))
	mux.Handle("/events/20230730-outdoor-climbing-he-mni-can-barn-bluff/", EventHandler())
	mux.Handle("/events/20230813-outdoor-skills-sharing-interstate-state-park/", EventHandler())

	mux.Handle("/update/", http.RedirectHandler("https://outclimb.gay/events/20230527-outdoor-climbing-saint-croix-falls", http.StatusTemporaryRedirect))
	mux.Handle("/contact/", ContactHandler())
}
