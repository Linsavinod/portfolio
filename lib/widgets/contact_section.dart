import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
class ContactSection extends StatelessWidget {
  const ContactSection ({super.key});

final String gmail='mailto:linsavinod82@gmail.com';
final String linkedin='https://linkedin.com/in/Linsa Vinod';
final String Github ='https://github.com/Linsavinod';

void launchURL(String url ) async {
  final Uri uri =Uri.parse(url);
  if(!await launchUrl(uri)) {
    throw 'Could not launch $url';
  }
}



  @override
  Widget build(BuildContext context){
    return Container(
      padding:const EdgeInsets.all(32),
      color: Colors.grey[900],
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Contact',
            style: TextStyle(fontSize :28, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          
           TextButton(
            onPressed: () => launchURL(gmail),
            child: const Text('Email'),
           ),
          TextButton(
            onPressed: () => launchURL(linkedin),
            child: const Text('Linkedin'),
          ),
        TextButton(
            onPressed: () => launchURL(Github),
            child: const Text('Github'),
        ),
        ],
      ),
    );
  }

}
