package main

import (
	"html/template"
	"net/http"
	"os"
)

type PageData struct {
	StartDate string
}

func main() {

	tmpl := template.Must(template.ParseFiles("templates/index.html"))

	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		data := PageData{
			StartDate: "2025-10-05T21:30:00",
		}
		tmpl.Execute(w, data)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.ListenAndServe(":"+port, nil)
}
