import 'package:flutter/material.dart';

class ContactSection extends StatelessWidget {
  const ContactSection ({super.key});

  @override
  Widget build(BuildContext context){
    return Container(
      padding:const EdgeInsets.all(32),
      color: Colors.grey[900],
      child: Column(
        children: const[
          Text(
            'Contact',
            style: TextStyle(fontSize :28, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 12),
           Text('📧 linsavinod82@gmail.com'),
          Text('🔗 LinkedIn: linkedin.com/in/linsavinod'),
          Text('💻 GitHub: github.com/Linsavinod'),
        ],
          ),
          );
  }

}
