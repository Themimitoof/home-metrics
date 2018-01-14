# Home-metrics : A complete stack for retreiving and showing metrics from your home
This little project contain a entire stack for receiving metrics from _IoT, servers,_ and other things with _MQTT_ protocol support. 

At the moment, _home-metrics_ receive only **_floats_** metrics. It's planned to allow another types of metrics (_integer_, _boolean_)

In the stack we find:
 * InfluxDB (_metric based database_)
 * Mosquitto (_MQTT broker_)
 * Grafana (_Dashboard_)
 * Gateway (_between MQTT and InfluxDB_)

The project was mainly designed to _docker-compose_ but you can install the whole stack manually.


## Requirements
You need on you computer/server this softwares:
 * [Docker](https://docker.com)
 * [Docker-compose](https://docs.docker.com/compose/)


## Installation
Make a copy of the ```config.js.template``` file and rename it in ```config.js```. Edit the informations inside and add your _topics_.

_Topics_ are the channel name on MQTT. The topic is splitted in two parts: ```<room or stuff>/<metric>```. Three examples are available in the ```config.js.template``` file.

Now, you need to build containers. For this, use the command: ```docker-compose build```. After this, you can run the containers with the command ```docker-compose up -d```.

You can now go into your browser and typing ```http://localhost:8560```, using the login credentials : ```admin``` and the password ```admin``` and start making dashboards in Grafana!

When you are on the datasource creation page, select the type ```InfluxDB```, into _URL_, put ```http://influxdb:8086``` and select _access_ in ```direct```. Enter the name of the _database_ (by default: ```homemetrics```) and save.

And voila! You can now play with Grafana! If you need help for configuring Grafana, see the [documentation of the tool](http://docs.grafana.org/).


## Update
To update, you need to _fetch_ all new files from the repo: ```git fetch```.

If you have edited your ```docker-compose.yml```, you need to _stash_ your file: ```git stash```.

Retreive the latest _tag_ or _branch_ modifications with ```git checkout <tag or branch>```

Now rebuild containers ```docker-compose build```, and start containers with ```docker-compose up -d```.


## Open ports
Three ports are open and listening on your server :
 * _8560_ : Grafana
 * _1883_ : Mosquitto (TCP portocol)
 * _9001_ : Mosquitto (For websockets)

You can edit ports binding on ```docker-compose.yml``` file. If you likely to use a reverse proxy like _Nginx_ for _Grafana_, edit the _ports setting_ on ```docker-compose.yml``` file and replace the line with: ```"127.0.0.1:8560":3000```.


## On next releases
For the next releases it's planned:
 * _Mosquitto configuration_ and _login_ support
 * _Auto provisionning_ Grafana for _datasource_
 * Add support for _integer_ and _boolean_ metrics


## Contributions
You can open issues for bugs you've found or features you think are missing. You can also submit pull requests to this repository.