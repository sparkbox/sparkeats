(ns migrate-sparkeats
  {:clj-kondo/config '{:lint-as {promesa.core/let clojure.core/let}}}

  (:require
   ["fs" :as fs]
   [promesa.core :as p]
   ["mysql2/promise" :as mysql]))


;; utilities

(defn select-all [tablename]
  (str "SELECT * FROM " tablename))

(defn stringify [rows]
  (js/JSON.stringify (clj->js rows)))

(defn base64->image [file-buffer]
  (js/Buffer.from (.toString file-buffer "utf-8") "base64"))

(defn js->clj-with-keys [js]
  (js->clj js :keywordize-keys true))

(defn has-image? [row]
  (not (nil? (:file (js->clj-with-keys row)))))

;; images

(defn write-image-file
  ":fd is the image filename."
  [tablename row]
  (let [path (str "data/" tablename)]
    (when (not (fs/existsSync path)) (fs/mkdirSync path))
    (fs/writeFileSync (str path  "/" (:fd row))
                      (base64->image (:file row)))))

(defn write-image-files [tablename rows]
  (->> rows
       (map #(js->clj-with-keys %))
       (run! #(write-image-file tablename %))))

;; json

(defn write-json-file [tablename rows]
  (fs/writeFileSync
   (str "data/" tablename ".json")
   (stringify rows)))

;; mysql

(def database #js {:host "localhost"
                   :user "root"
                   :database "sparkeats"})

(defn migrate-sparkeats [tablenames]
  (when (not (fs/existsSync "data")) (fs/mkdirSync "data"))
  (p/let [connection (mysql/createConnection database)]
    (doseq [tablename tablenames]
      (p/let [[rows] (.execute connection (select-all tablename))]
        (write-json-file tablename rows)
        (when (has-image? (first rows))
          (write-image-files tablename rows))))
    (.end connection)))

;; entry

(defn -main [& tablenames]
  (println "Migrating sparkeats.")
  (migrate-sparkeats tablenames))


;; develop

(defn scratch [])

(comment
  (-main "place" "placeImage" "review" "reviewImage")
  (scratch)
  (fs/rmdirSync (str "data/placeImage") #js {:recursive true}))
