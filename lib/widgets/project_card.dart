
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ProjectCard extends StatelessWidget{
  final String title;
  final String description;
  final String tech;
  final String github;


const ProjectCard({
  super.key,
  required this.title,
  required this.description,
  required this.tech,
  required this.github,
});


@override
Widget build(BuildContext context){
return Card(
  margin: const EdgeInsets.symmetric(vertical: 16),
  elevation: 3,
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
  child: Padding(
    padding: const EdgeInsets.all(20),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style:
          const TextStyle(fontSize: 22, fontWeight: FontWeight.bold,
          ),
        ),
    
            const SizedBox(height: 8),
            Text(description),
            const SizedBox(height: 8),
            Text("Tech Stack: $tech"),
            const SizedBox(height: 8),
            TextButton(
              onPressed: () => launchURL(github),
              child: const Text('View On Github'),
            ),
          ],
        ),
      ),
    );
  }

void launchURL(String url) async {
  final Uri uri = Uri.parse(url);
  if (!await launchUrl(uri)) {
    throw 'Could not launch $url';
  }
}
}


