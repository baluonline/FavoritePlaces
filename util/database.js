import * as SQLite from "expo-sqlite";
import { reject, result } from "lodash";
import { Place } from "../model/Place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT,
                lat REAL NOT NULL,
                lng REAL NOT NULL         
                )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places  (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
        //   console.log("result: " + JSON.stringify(result));
          resolve(result);
        }, // success case
        (_, err) => {
        //   console.log("err" + JSON.stringify(err));
        } //error case
      );
    });
  });
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql("SELECT * FROM places", [], (_, result) => {
        // console.log(result.rows._array);
        const places = [];
        for (const dp of result.rows._array) {
          places.push(
            new Place(
              dp.title,
              dp.imageUri,
              {
                address: dp.address,
                lat: dp.lat,
                lng: dp.lng,
              },
              dp.id
            )
          );
        }
        // console.log('resolve '+places)
        resolve(places);
      }),
        (_, err) => {
          reject(err);
        };
    });
  });
  return promise;
}


export function fetchPlaceDetails(id){
    const promise = new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql("SELECT * FROM places WHERE ID=?",[id],
            (_,result)=>{
                // console.log(result.rows._array)
                const dp = result.rows._array[0]
               const place = new Place(
                    dp.title,
                    dp.imageUri,
                    {
                      address: dp.address,
                      lat: dp.lat,
                      lng: dp.lng,
                    },
                    dp.id
                  )
                resolve(place)
            }           
            
            ,(_,err)=>{reject(err)}
            )
        })
    })
    return promise;
}